/**
 * 
 */
var webench = document.getElementById('webench');
var profile = document.getElementById('profile');
var logout = document.getElementById('logout');
var web3LoginForm = document.getElementById('web3Login');
var userIcon = document.getElementById('userLogo');

/**
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        await ethereum.enable();
        var accounts = await web3.eth.getAccounts();
       
        if (accounts.length > 0) {
            sessionStorage.setItem("connectedLoginUpdate", "true");
            logout.style.display = "block";
            webench.href = "webench"
    
        }
        else {
            sessionStorage.setItem("connectedLoginupdate", "false");
            logout.style.display = "none";
            webench.href = "connectWallet"

        }
        
    }
})
*/




window.addEventListener('load', async () => {
	var connected = sessionStorage.getItem("connected");
	//var path = sessionStorage.getItem("path");
	var path = "Users/ramandeepsingh/eclipse-workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/DATAVIEW/WEB-INF/systemFiles/";
	var separator = sessionStorage.getItem("separator");
	
	if (connected && connected == "true") {
		window.web3 = new Web3(window.ethereum);
		var account;
		try{
		   var accounts = await web3.eth.getAccounts();
		   account = accounts[0];
		} catch(error) {
			console.error(error);
		}
		
		logout.style.display = "block";
		webench.addEventListener('click', () => {
			post('webench', account);
		})	
		profile.addEventListener('click', () => {
			post('profile', account);
		})	
		console.log(path);
		userIcon.src= "profileImage?id="+account;
		return
	}
	
	logout.style.display = "none";
	userIcon.src="./Style/images/accountImage.png"
	webench.addEventListener('click', () => {
			postSimpleAction('connectWallet');
})
	profile.addEventListener('click', () => {
			postSimpleAction('connectWallet');
		})		

})

//to logout, just make connected false in session storage
logout.addEventListener('click', () => {
	sessionStorage.setItem("connected", "false");
	location.reload();
})

function post(action, value) {


  const form = document.createElement('form');
  form.method = 'post';
  form.action = action;
  const hiddenField = document.createElement('input');
  hiddenField.type = 'hidden';
  hiddenField.name = 'userId';
  hiddenField.value = value;
  form.appendChild(hiddenField);

  document.body.appendChild(form);
  form.submit();
}

function postSimpleAction(action) {


  const form = document.createElement('form');
  form.method = 'post';
  form.action = action;

  document.body.appendChild(form);
  form.submit();
}

