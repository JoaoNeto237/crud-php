import "./TelefoneField.css";

export default function TelefoneField({ index, telefone, onChange, onRemove, showRemove }) {
  return (
    <div className="telefone-field">
      <input
        placeholder="Número do Telefone"
        value={telefone.numero}
        onChange={(e) => onChange(index, "numero", e.target.value)}
      />
      <input
        placeholder="Descrição (Ex: Celular, Trabalho)"
        value={telefone.descricao}
        onChange={(e) => onChange(index, "descricao", e.target.value)}
      />
      {showRemove && (
        <button type="button" className="remove-btn" onClick={() => onRemove(index)}>
          Remover
        </button>
      )}
    </div>
  );
}
