const paramsToObject = entries => {
  const result = {};

  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }

  return result;
}; // const loadFileCss = () => {
//      // Get HTML head element
//      var head = document.getElementsByTagName('HEAD')[0]; 
//      // Create new link Element
//      var link = document.createElement('link');
//      // set the attributes for link element 
//      link.rel = 'stylesheet'; 
//      link.type = 'text/css';
//      link.href = './src/css/global.css'; 
//      // Append link element to HTML head
//      head.appendChild(link); 
// }


const closeBoxGowp = () => {
  let boxWpp = document.getElementById('box-gowp');
  boxWpp.style.display = 'none';
};

const handleSendGowp = async () => {
  let scriptFile = document.getElementById('gowpchat');
  let scriptFileURL = scriptFile.getAttribute('src');
  let urlCustom = new URL(scriptFileURL);
  let params = paramsToObject(urlCustom.searchParams.entries());
  let text = 'Olá, vamos conversar?';

  try {
    let dataToSend = {
      from: "gowhatsapp",
      cd_find: params.cd_find,
      nome: document.getElementById('name-input-gowp').value,
      email: document.getElementById('email-input-gowp').value,
      telefone: document.getElementById('phone-input-gowp').value,
      observacao: "Mensagem envia no WhatsApp"
    };
    fetch('http://192.168.0.13:8000/api/register-lead', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(dataToSend)
    }).then(res => res.json()).then(res => console.log(res));
  } catch (error) {
    console.log(error);
  }

  window.location.href = `https://api.whatsapp.com/send?phone=${params.cd_wp}&text=${text}`;
};

const loadButton = () => {
  let goWpContentPlugin = document.createElement("div");
  goWpContentPlugin.setAttribute("id", "golead-wpp"); // loadFileCss();

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
                <button type="button" class="btn-send-wpp" onclick="handleSendGowp();">Vamos lá!</button>
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