/* ============================================================
   APLICAÇÃO DO BLOG DIAGONAL
   - Armazenamento: localStorage (com fallback em memória)
   - CRUD completo de reportagens via painel administrativo
   - Site público com listagem, busca e leitura de artigos
   ============================================================ */

/* ---------- Configuração ---------- */
const ADMIN_PASSWORD = "diagonal2025"; // troque por uma senha real / autenticação no back-end
const STORAGE_KEY    = "diagonal_blog_posts";

/* ---------- Camada de armazenamento (resiliente) ----------
   Usa localStorage quando disponível; se o ambiente bloquear
   (ex.: sandbox), cai para um objeto em memória sem quebrar. */
const Store = {
  _mem: {},
  read(key, fallback){
    try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return (key in this._mem) ? this._mem[key] : fallback; }
  },
  write(key, val){
    try{ localStorage.setItem(key, JSON.stringify(val)); }
    catch(e){ this._mem[key] = val; }
  }
};

/* ---------- Dados iniciais (seed) ----------
   Carregados apenas na primeira visita; depois o admin gerencia. */
const SEED = [
  {
    id: 1,
    titulo: "MEI: o que muda nas obrigações em 2025",
    categoria: "Tributário",
    data: "2025-05-28",
    resumo: "Novos limites de faturamento, prazos da DASN-SIMEI e cuidados para não cair na malha. Veja o que todo microempreendedor precisa saber.",
    conteudo: "O Microempreendedor Individual segue como uma das portas de entrada mais simples para a formalização no Brasil, mas 2025 traz ajustes importantes que merecem atenção.\n\nO primeiro ponto é o limite de faturamento, que define quem pode permanecer na categoria. Ultrapassá-lo sem o devido desenquadramento pode gerar cobranças retroativas de tributos.\n\nOutro cuidado essencial é a entrega da Declaração Anual do Simples Nacional (DASN-SIMEI). Mesmo o MEI sem movimento precisa declarar, e o atraso gera multa.\n\nNossa recomendação é manter o controle mensal de receitas e guardar todas as notas. A organização ao longo do ano evita surpresas e mantém o CNPJ regular.",
    imagem: ""
  },
  {
    id: 2,
    titulo: "Imposto de Renda: prazos, deduções e erros comuns",
    categoria: "Pessoa Física",
    data: "2025-04-15",
    resumo: "Antecipe a entrega, organize os comprovantes e conheça as deduções que reduzem o valor a pagar — ou aumentam sua restituição.",
    conteudo: "A declaração do Imposto de Renda costuma gerar dúvidas, principalmente sobre o que pode ou não ser deduzido.\n\nDespesas com saúde, educação e dependentes estão entre as deduções mais comuns, mas cada uma tem regras específicas de comprovação.\n\nUm erro frequente é deixar a entrega para os últimos dias. Além do risco de instabilidade no sistema, a pressa aumenta a chance de digitar dados errados e cair na malha fina.\n\nNossa equipe acompanha cada etapa para garantir que a declaração esteja correta e otimizada dentro da lei.",
    imagem: ""
  },
  {
    id: 3,
    titulo: "Como organizar o financeiro da sua empresa",
    categoria: "Gestão",
    data: "2025-03-30",
    resumo: "Separar contas, registrar fluxo de caixa e reservar para impostos: práticas simples que evitam o sufoco no fim do mês.",
    conteudo: "A saúde financeira de um negócio começa com hábitos simples, mas constantes.\n\nO primeiro passo é separar as finanças pessoais das da empresa. Misturar os dois é uma das maiores causas de descontrole entre pequenos empreendedores.\n\nManter um fluxo de caixa atualizado — entradas e saídas registradas — dá visibilidade real sobre a operação e ajuda na tomada de decisão.\n\nPor fim, reserve mensalmente o valor estimado de impostos. Assim, as obrigações tributárias deixam de ser um susto e passam a fazer parte do planejamento.",
    imagem: ""
  },
  {
    id: 4,
    titulo: "Simples Nacional ou Lucro Presumido: qual escolher?",
    categoria: "Tributário",
    data: "2025-02-18",
    resumo: "O regime tributário certo pode representar uma economia significativa. Entenda as diferenças e como decidir com segurança.",
    conteudo: "A escolha do regime tributário é uma das decisões mais estratégicas para qualquer empresa.\n\nO Simples Nacional unifica tributos em uma única guia e costuma ser vantajoso para faturamentos menores, com menos burocracia.\n\nJá o Lucro Presumido pode ser mais eficiente em alguns setores e faixas de receita, especialmente quando a margem de lucro real é alta.\n\nNão existe resposta única: a decisão depende do faturamento, da atividade e da estrutura de custos. Um estudo tributário é o caminho mais seguro para reduzir a carga sem riscos.",
    imagem: ""
  },
  {
    id: 5,
    titulo: "Folha de pagamento: obrigações que não podem falhar",
    categoria: "Departamento Pessoal",
    data: "2025-01-22",
    resumo: "Do eSocial às férias e ao 13º, conheça as rotinas que mantêm sua empresa em conformidade com a legislação trabalhista.",
    conteudo: "A folha de pagamento vai muito além do salário transferido no fim do mês.\n\nEncargos como INSS e FGTS, além das informações enviadas ao eSocial, precisam de precisão e prazo. Erros geram multas e passivos trabalhistas.\n\nFérias, 13º salário e rescisões têm cálculos próprios e datas-limite que exigem acompanhamento contínuo.\n\nContar com um departamento pessoal estruturado garante que cada colaborador seja remunerado corretamente e que a empresa cumpra todas as suas obrigações.",
    imagem: ""
  },
  {
    id: 6,
    titulo: "Nota fiscal eletrônica: evite as multas mais comuns",
    categoria: "Fiscal",
    data: "2024-12-10",
    resumo: "Emissão correta, dados do cliente e prazos de transmissão. Pequenos descuidos na NF-e podem custar caro.",
    conteudo: "A emissão de notas fiscais eletrônicas é rotina para a maioria das empresas, mas ainda concentra erros que resultam em autuações.\n\nDados incorretos do destinatário, classificação fiscal equivocada (NCM) e CFOP errado estão entre as falhas mais frequentes.\n\nOutro ponto crítico é o prazo de transmissão e o cancelamento dentro da janela permitida pela legislação.\n\nManter um processo padronizado de emissão e revisão reduz drasticamente o risco fiscal e evita transtornos com o Fisco.",
    imagem: ""
  }
];

/* ---------- Estado ---------- */
let posts = Store.read(STORAGE_KEY, null);
if(!posts){ posts = SEED.slice(); Store.write(STORAGE_KEY, posts); }
let currentFilter = "";

/* ---------- Utilidades ---------- */
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

function formatDate(iso){
  if(!iso) return "";
  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
}
function escapeHtml(str=""){
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function sortByDate(arr){
  return arr.slice().sort((a,b)=> (b.data||"").localeCompare(a.data||""));
}
function thumbHTML(p){
  return p.imagem
    ? `<img src="${escapeHtml(p.imagem)}" alt="${escapeHtml(p.titulo)}" onerror="this.outerHTML='<div class=&quot;ph&quot;>D</div>'" />`
    : `<div class="ph">D</div>`;
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg){
  const t = $("#toast");
  t.innerHTML = `<span style="color:var(--gold)">&#10003;</span> ${escapeHtml(msg)}`;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("show"), 2600);
}

/* ============================================================
   RENDERIZAÇÃO DO SITE PÚBLICO
============================================================ */
function renderGrid(){
  const grid = $("#grid");
  let list = sortByDate(posts);

  if(currentFilter){
    const q = currentFilter.toLowerCase();
    list = list.filter(p =>
      (p.titulo + " " + p.resumo + " " + p.categoria).toLowerCase().includes(q)
    );
  }

  $("#countPill").textContent = `${list.length} ${list.length === 1 ? "post" : "posts"}`;

  if(list.length === 0){
    grid.innerHTML = `<div class="empty">Nenhuma reportagem encontrada${currentFilter ? ` para “${escapeHtml(currentFilter)}”` : ""}.</div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card-thumb">
        ${thumbHTML(p)}
        ${p.categoria ? `<span class="tag">${escapeHtml(p.categoria)}</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-meta">${formatDate(p.data)}</div>
        <h3>${escapeHtml(p.titulo)}</h3>
        <p>${escapeHtml(p.resumo)}</p>
        <a class="read-more" href="#">Ler mais &rarr;</a>
      </div>
    </article>
  `).join("");

  // clique abre o artigo
  $$(".card", grid).forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      openArticle(Number(card.dataset.id));
    });
  });
}

function renderLatest(){
  const ul = $("#latestList");
  const list = sortByDate(posts).slice(0, 4);
  ul.innerHTML = list.map((p, i) => `
    <li data-id="${p.id}">
      <div class="l-cat">${escapeHtml(p.categoria || "Artigo")}</div>
      <div class="l-title">${escapeHtml(p.titulo)}</div>
      <div class="l-date">${formatDate(p.data)}</div>
      ${i < list.length-1 ? '<div class="divider" style="margin-top:14px"></div>' : ''}
    </li>
  `).join("");
  $$("li", ul).forEach(li => li.addEventListener("click", () => openArticle(Number(li.dataset.id))));
}

/* ---------- Leitura do artigo ---------- */
function openArticle(id){
  const p = posts.find(x => x.id === id);
  if(!p) return;
  const paras = (p.conteudo || "").split(/\n\s*\n/).filter(Boolean)
    .map(t => `<p>${escapeHtml(t)}</p>`).join("");
  $("#modal").innerHTML = `
    <div class="modal-hero">
      ${p.imagem ? `<img src="${escapeHtml(p.imagem)}" alt="">` : `<div class="ph" style="height:100%">D</div>`}
      <button class="modal-close" id="modalClose" aria-label="Fechar">&times;</button>
    </div>
    <div class="modal-body">
      <div class="card-meta">${escapeHtml(p.categoria || "Artigo")} &nbsp;·&nbsp; ${formatDate(p.data)}</div>
      <h1>${escapeHtml(p.titulo)}</h1>
      <div class="article">${paras || `<p>${escapeHtml(p.resumo)}</p>`}</div>
    </div>`;
  $("#overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  $("#modalClose").addEventListener("click", closeArticle);
}
function closeArticle(){
  $("#overlay").classList.remove("open");
  document.body.style.overflow = "";
}
$("#overlay").addEventListener("click", e => { if(e.target.id === "overlay") closeArticle(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeArticle(); });

/* ---------- Busca ---------- */
function doSearch(){ currentFilter = $("#searchInput").value.trim(); renderGrid(); }
$("#searchBtn").addEventListener("click", doSearch);
$("#searchInput").addEventListener("input", doSearch);

/* ---------- Navbar: scroll + menu mobile ---------- */
window.addEventListener("scroll", () => {
  $("#header").classList.toggle("scrolled", window.scrollY > 20);
});
$("#burger").addEventListener("click", () => $("#menu").classList.toggle("open"));

/* ============================================================
   PAINEL ADMINISTRATIVO
============================================================ */
const adminEl = $("#admin"), publicEl = $("#public");

function showAdmin(){
  adminEl.classList.add("active");
  publicEl.style.display = "none";
  window.scrollTo(0,0);
}
function showPublic(){
  adminEl.classList.remove("active");
  publicEl.style.display = "";
  renderAll();
}
$("#openAdmin").addEventListener("click", e => { e.preventDefault(); showAdmin(); });
$("#viewSite").addEventListener("click", showPublic);

/* ---------- Login ---------- */
function tryLogin(){
  const pw = $("#pwInput").value;
  if(pw === ADMIN_PASSWORD){
    $("#loginWrap").classList.remove("active");
    $("#dashboard").style.display = "";
    $("#adminTopActions").style.display = "flex";
    $("#loginErr").textContent = "";
    $("#pwInput").value = "";
    renderAdmin();
    resetForm();
  } else {
    $("#loginErr").textContent = "Senha incorreta. Tente novamente.";
  }
}
$("#loginBtn").addEventListener("click", tryLogin);
$("#pwInput").addEventListener("keydown", e => { if(e.key === "Enter") tryLogin(); });
$("#logout").addEventListener("click", () => {
  $("#dashboard").style.display = "none";
  $("#adminTopActions").style.display = "none";
  $("#loginWrap").classList.add("active");
});

/* ---------- Renderização do dashboard ---------- */
function renderAdmin(){
  const list = sortByDate(posts);
  // estatísticas
  $("#statTotal").textContent = posts.length;
  $("#statCats").textContent  = new Set(posts.map(p => p.categoria).filter(Boolean)).size;
  $("#statLast").textContent  = list[0] ? formatDate(list[0].data) : "—";
  $("#admCount").textContent  = posts.length;

  // datalist de categorias
  $("#catList").innerHTML = [...new Set(posts.map(p => p.categoria).filter(Boolean))]
    .map(c => `<option value="${escapeHtml(c)}">`).join("");

  // lista de posts
  const el = $("#admList");
  if(list.length === 0){
    el.innerHTML = `<p class="hint" style="padding:20px 0">Nenhuma reportagem publicada ainda.</p>`;
    return;
  }
  el.innerHTML = list.map(p => `
    <div class="adm-item">
      <div class="adm-thumb">${p.imagem ? `<img src="${escapeHtml(p.imagem)}" alt="">` : "D"}</div>
      <div class="adm-info">
        <div class="t">${escapeHtml(p.titulo)}</div>
        <div class="m">${escapeHtml(p.categoria || "—")} · ${formatDate(p.data)}</div>
      </div>
      <div class="adm-btns">
        <button class="icon-btn" data-edit="${p.id}" title="Editar">&#9998;</button>
        <button class="icon-btn del" data-del="${p.id}" title="Excluir">&#128465;</button>
      </div>
    </div>
  `).join("");

  $$("[data-edit]", el).forEach(b => b.addEventListener("click", () => loadForEdit(Number(b.dataset.edit))));
  $$("[data-del]", el).forEach(b => b.addEventListener("click", () => deletePost(Number(b.dataset.del))));
}

/* ---------- Formulário: imagem (URL ou upload) ---------- */
function updatePreview(src){
  const box = $("#imgPreview");
  box.innerHTML = src ? `<img src="${escapeHtml(src)}" alt="">` : "Pré-visualização da capa";
}
$("#fImagem").addEventListener("input", e => updatePreview(e.target.value.trim()));
$("#fFile").addEventListener("change", e => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => { $("#fImagem").value = ev.target.result; updatePreview(ev.target.result); };
  reader.readAsDataURL(file); // converte para base64 para guardar localmente
});

/* ---------- Formulário: novo / editar / cancelar ---------- */
function resetForm(){
  $("#editId").value = "";
  $("#fTitulo").value = "";
  $("#fCategoria").value = "";
  $("#fData").value = new Date().toISOString().slice(0,10);
  $("#fResumo").value = "";
  $("#fConteudo").value = "";
  $("#fImagem").value = "";
  $("#fFile").value = "";
  updatePreview("");
  $("#formTitle").textContent = "Nova reportagem";
  $("#saveBtn").textContent = "Publicar reportagem";
  $("#cancelBtn").style.display = "none";
  $("#newBtn").style.display = "none";
}
function loadForEdit(id){
  const p = posts.find(x => x.id === id);
  if(!p) return;
  $("#editId").value = p.id;
  $("#fTitulo").value = p.titulo;
  $("#fCategoria").value = p.categoria || "";
  $("#fData").value = p.data || "";
  $("#fResumo").value = p.resumo || "";
  $("#fConteudo").value = p.conteudo || "";
  $("#fImagem").value = p.imagem || "";
  updatePreview(p.imagem || "");
  $("#formTitle").textContent = "Editar reportagem";
  $("#saveBtn").textContent = "Salvar alterações";
  $("#cancelBtn").style.display = "";
  $("#newBtn").style.display = "";
  window.scrollTo({ top:0, behavior:"smooth" });
}
$("#cancelBtn").addEventListener("click", resetForm);
$("#newBtn").addEventListener("click", resetForm);

/* ---------- Salvar (criar ou atualizar) ---------- */
$("#saveBtn").addEventListener("click", () => {
  const titulo = $("#fTitulo").value.trim();
  if(!titulo){ toast("Informe um título."); $("#fTitulo").focus(); return; }

  const data = {
    titulo,
    categoria: $("#fCategoria").value.trim(),
    data:      $("#fData").value || new Date().toISOString().slice(0,10),
    resumo:    $("#fResumo").value.trim(),
    conteudo:  $("#fConteudo").value.trim(),
    imagem:    $("#fImagem").value.trim()
  };

  const editId = $("#editId").value;
  if(editId){
    const i = posts.findIndex(p => p.id === Number(editId));
    posts[i] = { ...posts[i], ...data };
    toast("Reportagem atualizada.");
  } else {
    const newId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    posts.push({ id:newId, ...data });
    toast("Reportagem publicada.");
  }

  Store.write(STORAGE_KEY, posts);
  renderAdmin();
  resetForm();
});

/* ---------- Excluir ---------- */
function deletePost(id){
  const p = posts.find(x => x.id === id);
  if(!confirm(`Excluir a reportagem “${p.titulo}”?\nEsta ação não pode ser desfeita.`)) return;
  posts = posts.filter(x => x.id !== id);
  Store.write(STORAGE_KEY, posts);
  renderAdmin();
  if($("#editId").value === String(id)) resetForm();
  toast("Reportagem excluída.");
}

/* ============================================================
   INICIALIZAÇÃO
============================================================ */
function renderAll(){ renderGrid(); renderLatest(); }
renderAll();
