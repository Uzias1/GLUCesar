/*
logica con js 6 que se encargue del cifrado
y descifrado del texto area considerando usar
funciones anonimas y callback
*/ 

var cesar = cesar || (function(){
    //para poder cifrar o descifrar necesito 3 
    //parametros
    //mensaje, desp, accion
    var doStaff = function(txt, desp, action){
        //la nueva version de js ya no usa var, ahora
        //todo es let y const
        var replace = (function(){
            //necesito alfabeto
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

            var l = abc.length;
            //hay que hacer una funcion que se encargue de poder 
            //realizar el cambio de las posiciones de las letras
            //para el cifrado, 
            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                //reemplazo de las posiciones o movimiento xd
                //primero hay que saber si esta vacio
                if(i != -1){
                    //movimiento de las posiciones
                    var pos = i;
                    if(action){
                        //cifrar
                        /*pos += desp%l;
                        pos -= (pos>=1)?1:0;*/
                        
                        if((pos+desp%l) >= l){
                            pos = (pos+desp%l)-l;
                        } else {
                            pos = pos + desp%l;
                        }
                    } else {
                        //descifrando
                        /*pos -= desp%l;
                        pos += (pos<0)?1:0;*/
                         if((pos-desp%l) < 0){
                            pos = (pos-desp%l) + l;
                         } else {
                            pos = pos - desp%l;
                         }
                    }
                    return abc[pos];
                }
                return c;
            };

        })();
        //vamos a necesitar regresar el reemplazo de la cadena
        //pero primero hay que verificarlo
        var re = (/[a-z\u00f1]/ig);// el \u00f1 es la ñ XD
        return String(txt).replace(re, function(match){
            //se encarga de buscar las coincidencias entre
            //la expresion regular y el text area
            return replace(match);
        });
        
    };

    //necesito enviar si vamos a cifrar o desccifrar
    return {
        //cifras?
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();


//crear las funciones codificar y decodificar

function codificar(){
    if((document.getElementById("incremento").value).match(/[0-9]/ig) && (document.getElementById("incremento").value)>0 && ((document.getElementById("incremento").value))%1 == 0){
        document.getElementById("resultado").innerHTML = 
        cesar.encode(document.getElementById("cadena").value, document.getElementById("incremento").value);
    } else {
        alert("Por favor, ingrese un numero valido en el campo de incremento");
    }
    
}

function decodificar(){
    if ((document.getElementById("incremento").value).match(/[0-9]/ig) && (document.getElementById("incremento").value)>0 && ((document.getElementById("incremento").value))%1 == 0){
        document.getElementById("resultado").innerHTML = 
        cesar.decode(document.getElementById("cadena").value, document.getElementById("incremento").value);
    } else {
        alert("Por favor, ingrese un numero valido en el campo de incremento");
    }
    
}