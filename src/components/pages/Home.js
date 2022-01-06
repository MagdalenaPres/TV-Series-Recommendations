import React, {Component} from 'react';

var Background = "https://hdwallpaperim.com/wp-content/uploads/2017/08/23/472571-film_reel-movies-748x403.jpg";
var btn = document.getElementById("create_btn"); 
var div_list = document.getElementById("w_list");

class Home extends Component {
    constructor(props) {
        super(props);
        this.create_btn = this.create_btn.bind(this);
        this.create_list = this.create_list.bind(this);
        this.add_to_end = this.add_to_end.bind(this);
        this.add_to_beginning = this.add_to_beginning.bind(this);
        this.remove_from_end = this.remove_from_end.bind(this);
        this.submit_list = this.submit_list.bind(this);
        this.reset_list = this.reset_list.bind(this);
      }

    create_btn()
    {
        btn = document.getElementById("create_btn"); 
        btn.remove();
        this.create_list();
    }
    create_list(){
        div_list.classList.add("show");

        var button_append = document.createElement("BUTTON");
        button_append.innerHTML = "Dodaj na koniec";

        var button_before = document.createElement("BUTTON");
        button_before.innerHTML = "Dodaj na początek";

        var button_remove = document.createElement("BUTTON");
        button_remove.innerHTML = "Usuń element z końca";

        var button_submit = document.createElement("BUTTON");
        button_submit.innerHTML = "Wyślij";

        var button_reset = document.createElement("BUTTON");
        button_reset.innerHTML = "Resetuj";

        button_append.classList.add("wListBtn");
        button_before.classList.add("wListBtn");
        button_append.classList.add("wListBtn");
        button_remove.classList.add("wListBtn");
        button_submit.classList.add("wListBtn");
        button_reset.classList.add("wListBtn");

        div_list.appendChild(button_append);
        div_list.appendChild(button_before);
        div_list.appendChild(button_remove);
        div_list.appendChild(button_submit);
        div_list.appendChild(button_reset);

        button_append.addEventListener("click", function() { this.add_to_end(); });
        button_before.addEventListener("click", function() { this.add_to_beginning(); });
        button_remove.addEventListener("click", function() { this.remove_from_end(); });
        button_submit.addEventListener("click", function() { this.submit_list(); });
        button_reset.addEventListener("click", function() { this.reset_list(); });
    }
add_to_end()
{
    var listNode = document.getElementById('my_list');
    var liNode = document.createElement("LI");

    var txtVal = document.getElementById('input_list').value;
    var txtNode = document.createTextNode(txtVal);
            
    liNode.appendChild(txtNode);
    listNode.appendChild(liNode);
}

add_to_beginning()
{
    var listNode = document.getElementById('my_list');
    var liNode = document.createElement("LI");

    var txtVal = document.getElementById('input_list').value;
    var txtNode = document.createTextNode(txtVal);
            
    liNode.appendChild(txtNode);
    listNode.insertBefore(liNode, listNode.childNodes[0]); 
}

remove_from_end()
{
    var listNode = document.getElementById("my_list"); 
    listNode.removeChild(listNode.lastChild);
}

submit_list()
{
    document.getElementById("my_list").innerHTML=" ";
}

reset_list()
{
    document.getElementById("my_list").innerHTML=" ";
}

pressed_enter = (event) => {
    var x = event.keyCode;
    if (x == 13) {  
      this.add_to_end();
    }
  }
    render() {
        return (
            <div className="container-fluid">
                <section className= "top">
                    <section className= "welcome">
                        <img className="background_index" src={Background} alt="movies-poster"/>
                        <div className="text_on_image">Witajcie na <br/> filmowo-serialowych <br/> polecajkach!</div> 

                            <div className="text_welcome"><br />Cześć! Jesteśmy studentkami Informatyki, które w wolych chwilach uwielbiają oglądać filmy i seriale.<br /> Postanowiłyśmy podzielić
                                się z Wami naszymi opiniami na temat tego, co właśnie obejrzałyśmy. <br />Zaglądajcie śmiało i koniecznie dajcie nam znać co sądzicie!</div>
                        
                        <div className="text_names"><h3>Justyna &amp; Magda</h3></div>
                    </section>
                </section>

            </div>
        );
    }
}
export default Home