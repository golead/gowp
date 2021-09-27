const paramsToObject = entries => {
  const result = {};

  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }

  return result;
};

const closeBoxGowp = () => {
  let boxWpp = document.getElementById('box-gowp');
  boxWpp.style.display = 'none';
};

const handleSendGowp = async () => {
  document.getElementById('text-not-loading-wp').style.display = 'none';
  document.getElementById('text-loading-wp').style.display = 'block';
  let scriptFile = document.getElementById('gowpchat');
  let scriptFileURL = scriptFile.getAttribute('src');
  let urlCustom = new URL(scriptFileURL);
  let params = paramsToObject(urlCustom.searchParams.entries());
  let text = 'Olá, vamos conversar?';
  let dataToSend = {
    from: "gowhatsapp",
    cd_user: params.cd_user,
    ref_channel: params.ref_channel,
    nome: document.getElementById('name-input-gowp').value,
    email: document.getElementById('email-input-gowp').value,
    telefone: document.getElementById('phone-input-gowp').value,
    observacao: "Mensagem envia no WhatsApp"
  };

  try {
    await fetch('http://localhost:3001/prod/send-lead-whatsapp', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    }).then(res => res.json());
    let contentTextErrro = document.getElementById('text-error-wp');
    contentTextErrro.style.display = 'none';
    document.getElementById('text-not-loading-wp').style.display = 'block';
    document.getElementById('text-loading-wp').style.display = 'none';
    window.location.href = `https://api.whatsapp.com/send?phone=${params.cd_wp}&text=${text}`;
  } catch (error) {
    console.log(error);
    document.getElementById('text-not-loading-wp').style.display = 'block';
    document.getElementById('text-loading-wp').style.display = 'none';
    document.getElementById('text-error-wp').style.display = 'block';
  }
};

const loadButton = () => {
  let goWpContentPlugin = document.createElement("div");
  goWpContentPlugin.setAttribute("id", "golead-wpp");
  let btn = document.createElement("button");
  let boxWhats = document.createElement("div");
  btn.setAttribute('id', 'btn-gowpp');
  btn.innerHTML = `<div>
        <div class="btn-float-wpp">
            <img src="https://www.golead.com.br/images/canais/logo-whats-btn.png" />
        </div>
    </div>`;
  boxWhats.innerHTML = `
    <div class="box-whatsapp" style="display: none" id="box-gowp">
        <div class="box-header">
            <h5>Olá! Antes de continuarmos a conversa no WhatsApp, deixa eu te conhecer melhor!</h5>
            <button class="btn-close p-0 text-light" onClick="closeBoxGowp();"></button>
        </div>
        <div class="box-body">
            <form>
                <input type="text" class="input-custom" placeholder="Nome" id="name-input-gowp" required />
                <input type="email" class="input-custom" placeholder="E-mail" id="email-input-gowp" required />
                <input type="text" class="input-custom" placeholder="Telefone" id="phone-input-gowp" required />
                <button type="button" class="btn-send-wpp" onclick="handleSendGowp();">
                    <span id="text-not-loading-wp">Vamos lá!</span>
                    <span id="text-loading-wp" style="display: none">Carregando...</span>
                </button>
                <span class="text-error" id="text-error-wp" style="display: none">Ocorreu um problema inesperado! Tente mais tarde.</span>
            </form>
        </div>
    </div>
    `;
  btn.addEventListener('click', function () {
    let boxWpp = document.getElementById('box-gowp');
    boxWpp.style.display = 'block';
  });
  goWpContentPlugin.appendChild(btn);
  goWpContentPlugin.appendChild(boxWhats);
  document.body.appendChild(goWpContentPlugin);
};

window.onload = loadButton;