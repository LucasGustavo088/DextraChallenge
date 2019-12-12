import swal from 'sweetalert';

class Utils {
    
    static alertAirtech = (text, type, title) => {
        swal({
            title: title,
            text: text,
            icon: type,
            button: "Ok",
        });
    }

    static validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    
    static isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    static getBaseUrl = () => {
        var getUrl = window.location;
        let baseUrl = getUrl .protocol + "//" + getUrl.host + "/";

        return baseUrl;
    }

    static formatarReal = (int, comRS = false) => {

        if(comRS) {
            int = int.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        } else {
            int = int.toLocaleString('pt-br', {minimumFractionDigits: 2});
        }

        return int;
    }
    

    static validarData = (data) => {
        let retorno = false;

        if(data.length != 10) {
            return retorno;
        }

        data = data.split('/');
        if(data < 3) {
            return retorno;
        }
        
        let d = new Date(data[2] + '/' + data[1] + '/' + data[0]); 
        
        Date.prototype.isValid = function () { 
              
            // If the date object is invalid it 
            // will return 'NaN' on getTime()  
            // and NaN is never equal to itself. 
            return this.getTime() === this.getTime(); 
        }; 
          
        retorno = d.isValid(); 
        return retorno;
    }

}

export default Utils;
