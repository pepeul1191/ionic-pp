var Validacion = new Class({
    initialize: function(scope, input_id, mensaje_error = false){
        this.scope = scope;
        this.input_id = input_id;
        this.mensaje_error = mensaje_error;
        this.rpta = false;
    },
    ValidarCorreo() {
      var email = this.scope;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)){
            $(this.input_id).parent().removeClass("input-text-error");
            this.rpta = true;
        }else{
            $(this.input_id).parent().addClass("input-text-error");
            $(this.input_id).val("");
            $(this.input_id).attr("placeholder", "Ingrese un dirección de correo válida");
        }
    },
    ValidarTextLleno(){
      var texto = this.scope;

      if (typeof texto === "undefined"){
        $(this.input_id).parent().addClass("input-text-error");
        $(this.input_id).addClass('input-text-error-placeholder');
        $(this.input_id).val("");
        $(this.input_id).attr("placeholder", this.mensaje_error);
      }else{
        $(this.input_id).parent().removeClass("input-text-error");
        $(this.input_id).removeClass('input-text-error-placeholder');
        this.rpta = true;
      }
    },
    ValidarSelect(){
      var valor = $(this.input_id).val();

      if (valor == "E"){
        $(this.input_id).addClass("input-text-error");
        $(this.input_id).attr("placeholder", this.mensaje_error);
      }else{
        $(this.input_id).removeClass("input-text-error");
        this.rpta = true;
      }
    }
});