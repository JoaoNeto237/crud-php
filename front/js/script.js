const API_URL = "http://localhost:8000"; // apontando para sua pasta backend
const form = document.getElementById("formPessoa");
const listaPessoas = document.getElementById("listaPessoas");
const telefonesContainer = document.getElementById("telefonesContainer");
const addTelefoneBtn = document.getElementById("addTelefone");
const submitBtn = form.querySelector("button[type=submit]");

async function listarPessoas() {
  try {
    const resp = await fetch(`${API_URL}/listar.php`);
    const data = await resp.json();

    listaPessoas.innerHTML = data.map(p => `
  <div class="pessoa" data-id="${p.id}">
    <strong>${p.nome}</strong> - CPF: ${p.cpf}<br/>
    Endereço: ${p.logradouro}, ${p.cidade}-${p.uf}<br/>
    ${(p.telefones || [])
      .map(t => `Telefone: ${t.telefone} - Descrição: ${t.descricao}`)
      .join(", ")}<br/>
    <button class="editarPessoaBtn">Editar</button>
    <button class="excluirPessoaBtn">Excluir</button>
  </div>
`).join("");


    document.querySelectorAll(".editarPessoaBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.target.closest(".pessoa").dataset.id;
        carregarPessoaParaEditar(id);
      });
    });

    document.querySelectorAll(".excluirPessoaBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.target.closest(".pessoa").dataset.id;
        excluirPessoa(id);
      });
    });

  } catch (err) {
    console.error("Erro ao listar pessoas:", err);
  }
}

async function carregarPessoaParaEditar(id) {
  try {
    const resp = await fetch(`${API_URL}/listar.php`);
    const pessoas = await resp.json();
    const pessoa = pessoas.find(p => p.id == id);

    if (!pessoa) return alert("Pessoa não encontrada");

    // Preenche o form
    form.nome.value = pessoa.nome || "";
    form.cpf.value = pessoa.cpf || "";
    form.rg.value = pessoa.rg || "";
    form.cep.value = pessoa.cep || "";
    form.logradouro.value = pessoa.logradouro || "";
    form.complemento.value = pessoa.complemento || "";
    form.setor.value = pessoa.setor || "";
    form.cidade.value = pessoa.cidade || "";
    form.uf.value = pessoa.uf || "";

    telefonesContainer.innerHTML = "";

    (pessoa.telefones || []).forEach(t => {
      const div = document.createElement("div");
      div.classList.add("telefone-group");
      div.innerHTML = `
        <input type="text" name="telefone[]" placeholder="Telefone" required value="${t.telefone}" />
        <input type="text" name="descricao[]" placeholder="Descrição" required value="${t.descricao}" />
        <button type="button" class="removeTelefoneBtn">X</button>
      `;
      telefonesContainer.appendChild(div);
      div.querySelector(".removeTelefoneBtn").addEventListener("click", () => div.remove());
    });

    form.setAttribute("data-edit-id", id);
    submitBtn.textContent = "Salvar Alterações";
  } catch (err) {
    alert("Erro ao carregar pessoa: " + err.message);
  }
}

addTelefoneBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("telefone-group");
  div.innerHTML = `
    <input type="text" name="telefone[]" placeholder="Telefone" required />
    <input type="text" name="descricao[]" placeholder="Descrição" required />
    <button type="button" class="removeTelefoneBtn">X</button>
  `;
  telefonesContainer.appendChild(div);
  div.querySelector(".removeTelefoneBtn").addEventListener("click", () => div.remove());
});

form.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData(form);
  const telefones = Array.from(formData.getAll("telefone[]")).map((tel, i) => ({
    telefone: tel,
    descricao: formData.getAll("descricao[]")[i]
  }));

  const data = {
    nome: formData.get("nome"),
    cpf: formData.get("cpf"),
    rg: formData.get("rg"),
    cep: formData.get("cep"),
    logradouro: formData.get("logradouro"),
    complemento: formData.get("complemento"),
    setor: formData.get("setor"),
    cidade: formData.get("cidade"),
    uf: formData.get("uf"),
    telefones
  };

  const editId = form.getAttribute("data-edit-id");
  if (editId) data.id = editId;

  const url = editId ? `${API_URL}/atualizar.php` : `${API_URL}/salvar.php`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    alert(result.mensagem || "Operação realizada");

    form.reset();
    telefonesContainer.innerHTML = `
      <div class="telefone-group">
        <input type="text" name="telefone[]" placeholder="Telefone" required />
        <input type="text" name="descricao[]" placeholder="Descrição" required />
        <button type="button" class="removeTelefoneBtn">X</button>
      </div>
    `;
    form.removeAttribute("data-edit-id");
    submitBtn.textContent = "Cadastrar Pessoa";

    listarPessoas();
  } catch (err) {
    alert("Erro ao salvar: " + err.message);
  }
});

async function excluirPessoa(id) {
  if (!confirm("Deseja realmente excluir esta pessoa?")) return;

  try {
    const resp = await fetch(`${API_URL}/deletar.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    const result = await resp.json();
    alert(result.mensagem || "Pessoa deletada");
    listarPessoas();
  } catch (err) {
    alert("Erro ao excluir: " + err.message);
  }
}

listarPessoas();
