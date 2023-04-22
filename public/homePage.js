// Выход из личного кабинета

const logoutButton = new LogoutButton;
logoutButton.action = funcLogout;
function funcLogout() {
    ApiConnector.logout(response => {
        if(response.success === true) {
        return location.reload();
        };
    });        
};

// Получение информации о пользователе

ApiConnector.current(response => {
    if(response.success === true) {
        ProfileWidget.showProfile(response.data);  
    };
});

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

function getExchangeRates() {
    ApiConnector.getStocks(response => {
        if(response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};

getExchangeRates();

setInterval(getExchangeRates, 60000);

// Операции с деньгами

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = funcAddMoney;

function funcAddMoney(inf) {
    ApiConnector.addMoney(inf, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);            
            this.setMessage(true, 'Баланс успешно пополнен');               
        } else {
            this.setMessage(response.success, response.error);
        };          
    });        
};

moneyManager.conversionMoneyCallback = funcConversionMoney;

function funcConversionMoney (inf) {
    ApiConnector.convertMoney(inf, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, 'Конвертация выполнена успешно');        
        } else {
            this.setMessage(response.success, response.error);
        };  
    });
};

moneyManager.sendMoneyCallback = funcSendMoney;

function funcSendMoney(inf) {
    ApiConnector.transferMoney(inf, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, 'Перевод средств выполнен');     
        } else {
            this.setMessage(response.success, response.error);
        };  
    }); 
};

// Работа с избранным

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites(response => {
    if(response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };    
});

favoritesWidget.addUserCallback = funcAddUser;

function funcAddUser(inf) {
    ApiConnector.addUserToFavorites(inf, response => {
        if(response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            this.setMessage(response.success, 'Пользователь добавлен в избранное');    
        } else {
            this.setMessage(response.success, response.error);
        };  
    });
};

favoritesWidget.removeUserCallback = funcRemoveUser;

function funcRemoveUser(inf) {
    ApiConnector.removeUserFromFavorites(inf, response => {
        if(response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            this.setMessage(response.success, 'Пользователь удалён из избранного');   
        } else {
            this.setMessage(response.success, response.error);
        };  
    });
};