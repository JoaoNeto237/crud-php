import FormPessoa from "../components/FormPessoa/FormPessoa";
import { api } from "../services/api";

export default function CadastroPage() {
  const handleCadastro = async (dados) => {
    try {
      const response = await api.post("/salvar_pessoa.php", dados);
      alert(response.data.mensagem || "Pessoa salva com sucesso!");
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    }
  };

  return <FormPessoa onSubmit={handleCadastro} />;
}
