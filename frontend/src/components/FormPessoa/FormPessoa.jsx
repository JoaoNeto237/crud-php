import { useState } from "react";
import TelefoneField from "../TelefoneField/TelefoneField";
import "./FormPessoa.css";

export default function FormPessoa({ onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    rg: "",
    cep: "",
    logradouro: "",
    complemento: "",
    setor: "",
    cidade: "",
    uf: "",
  });

  const [telefones, setTelefones] = useState([{ numero: "", descricao: "" }]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTelefoneChange = (index, field, value) => {
    const novos = [...telefones];
    novos[index][field] = value;
    setTelefones(novos);
  };

  const adicionarTelefone = () => {
    setTelefones([...telefones, { numero: "", descricao: "" }]);
  };

  const removerTelefone = (index) => {
    setTelefones(telefones.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosCompletos = { ...form, telefones };
    if (onSubmit) onSubmit(dadosCompletos);
    setForm({
      nome: "",
      cpf: "",
      rg: "",
      cep: "",
      logradouro: "",
      complemento: "",
      setor: "",
      cidade: "",
      uf: "",
    });
    setTelefones([{ numero: "", descricao: "" }]);
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Pessoa</h2>
      <form onSubmit={handleSubmit}>
        {/* Dados pessoais */}
        <input placeholder="Nome" name="nome" value={form.nome} onChange={handleChange} />
        <input placeholder="CPF" name="cpf" value={form.cpf} onChange={handleChange} />
        <input placeholder="RG" name="rg" value={form.rg} onChange={handleChange} />

        <h2>Endereço</h2>
        <input placeholder="CEP" name="cep" value={form.cep} onChange={handleChange} />
        <input placeholder="Logradouro" name="logradouro" value={form.logradouro} onChange={handleChange} />
        <input placeholder="Complemento" name="complemento" value={form.complemento} onChange={handleChange} />
        <input placeholder="Setor" name="setor" value={form.setor} onChange={handleChange} />
        <input placeholder="Cidade" name="cidade" value={form.cidade} onChange={handleChange} />
        <input placeholder="UF" name="uf" value={form.uf} onChange={handleChange} />

        <h2>Telefones</h2>
        {telefones.map((tel, index) => (
          <TelefoneField
            key={index}
            index={index}
            telefone={tel}
            onChange={handleTelefoneChange}
            onRemove={removerTelefone}
            showRemove={telefones.length > 1}
          />
        ))}

        <button type="button" className="add-btn" onClick={adicionarTelefone}>
          + Adicionar Telefone
        </button>

        <div className="buttons">
          <button type="submit" className="save-btn">Gravar</button>
          <button type="reset" className="clear-btn" onClick={() => {
            setForm({
              nome: "",
              cpf: "",
              rg: "",
              cep: "",
              logradouro: "",
              complemento: "",
              setor: "",
              cidade: "",
              uf: "",
            });
            setTelefones([{ numero: "", descricao: "" }]);
          }}>Limpar</button>
        </div>
      </form>
    </div>
  );
}
