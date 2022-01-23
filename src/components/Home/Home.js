import React, { Component } from "react";
import Select from "react-select";

var Background =
  "https://hdwallpaperim.com/wp-content/uploads/2017/08/23/472571-film_reel-movies-748x403.jpg";
var btn = document.getElementById("create_btn");
const options = [
  { value: "10", label: "10" },
  { value: "9", label: "9" },
  { value: "8", label: "8" },
  { value: "7", label: "7" },
  { value: "6", label: "6" },
  { value: "5", label: "5" },
  { value: "4", label: "4" },
  { value: "3", label: "3" },
  { value: "2", label: "2" },
  { value: "1", label: "1" },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.div_list = React.createRef();

    this.create_btn = this.create_btn.bind(this);
    this.create_list = this.create_list.bind(this);
    this.add_to_end = this.add_to_end.bind(this);
    this.add_to_beginning = this.add_to_beginning.bind(this);
    this.remove_from_end = this.remove_from_end.bind(this);
    this.submit_list = this.submit_list.bind(this);
    this.reset_list = this.reset_list.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.check_avg = this.check_avg.bind(this);
  }

  create_btn() {
    btn = document.getElementById("create_btn");
    btn.remove();

    this.create_list();
  }
  create_list() {
    const node = this.div_list.current;

    node.classList.add("show");

    var button_append = document.createElement("BUTTON");
    button_append.innerHTML = "Add at the end";

    var button_before = document.createElement("BUTTON");
    button_before.innerHTML = "Add at the beginning";

    var button_remove = document.createElement("BUTTON");
    button_remove.innerHTML = "Delete from the end";

    var button_submit = document.createElement("BUTTON");
    button_submit.innerHTML = "Send";

    var button_reset = document.createElement("BUTTON");
    button_reset.innerHTML = "Reset";

    button_append.classList.add("wListBtn");
    button_before.classList.add("wListBtn");
    button_append.classList.add("wListBtn");
    button_remove.classList.add("wListBtn");
    button_submit.classList.add("wListBtn");
    button_reset.classList.add("wListBtn");

    node.appendChild(button_append);
    node.appendChild(button_before);
    node.appendChild(button_remove);
    node.appendChild(button_submit);
    node.appendChild(button_reset);

    button_append.addEventListener("click", (event) => {
      this.add_to_end();
    });
    button_before.addEventListener("click", (event) => {
      this.add_to_beginning();
    });
    button_remove.addEventListener("click", (event) => {
      this.remove_from_end();
    });
    button_submit.addEventListener("click", (event) => {
      this.submit_list();
    });
    button_reset.addEventListener("click", (event) => {
      this.reset_list();
    });
  }
  add_to_end() {
    var listNode = document.getElementById("my_list");
    var liNode = document.createElement("LI");

    var txtVal = document.getElementById("input_list").value;
    var txtNode = document.createTextNode(txtVal);

    liNode.appendChild(txtNode);
    listNode.appendChild(liNode);
  }

  add_to_beginning() {
    var listNode = document.getElementById("my_list");
    var liNode = document.createElement("LI");

    var txtVal = document.getElementById("input_list").value;
    var txtNode = document.createTextNode(txtVal);

    liNode.appendChild(txtNode);
    listNode.insertBefore(liNode, listNode.childNodes[0]);
  }

  remove_from_end() {
    var listNode = document.getElementById("my_list");
    listNode.removeChild(listNode.lastChild);
  }

  submit_list() {
    document.getElementById("my_list").innerHTML = " ";
  }

  reset_list() {
    document.getElementById("my_list").innerHTML = " ";
  }

  pressed_enter = (event) => {
    var x = event.keyCode;
    if (x === 13) {
      this.add_to_end();
    }
  };
  render() {
    return (
      <div className="container-fluid">
        <section className="top">
          <section className="welcome">
            <img
              className="background_index"
              src={Background}
              alt="movies-poster"
            />
            <div className="text_on_image">
              Welcome to <br />
              movies and tv series <br />
              recommendations!
            </div>

            <div className="text_welcome">
              <br />
              Hi! We are computer science students who love watching movies and
              series in their free time. <br /> We decided to share with you our
              opinions on what we just watched.
              <br />
              Stay tuned and be sure to let us know what you think!
            </div>
          </section>
        </section>

        <section className="wish_list">
          <div className="wish_list" id="wish_list">
            <br />
            <p>
              <strong>Wish list</strong>
            </p>
            <p>
              Make a list of movies and series that you want us to review in the
              future
            </p>
            <button onClick={this.create_btn} type="button" id="create_btn">
              Create
            </button>
            <div className="w_list" id="w_list" ref={this.div_list}>
              <div className="border_l" id="border_l">
                <ul id="my_list"></ul>
              </div>
              <div>
                <label>Your proposition:</label>
                <br />
                <input
                  type="text"
                  id="input_list"
                  onKeyDown={this.pressed_enter}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="nextto">
          <div id="float">
            <div id="mail-div">
              <p>
                Maybe you want to recommend a movie or series to us? Write to
                us!
              </p>
              <div>
                  <a href="mailto:254520@student.pwr.edu.pl">
                    <img
                      src="http://ppp5.pl/wp-content/uploads/2017/03/email-icon-23-300x300.png"
                      width="30"
                      height="30"
                      alt="Email"
                      id="index_transition"
                    />{" "}
                  </a>
                </div>
              
            </div>
            <div id="form_index">
              <form>
                <div>
                  <label>
                    Rate us!
                    <Select options={options} />
                  </label>
                </div>
                <div>
                  <button onClick={this.showAlert} id="send_btn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
          <section className="watch_on_average">
            <div className="avg_watch">
              <p>
                <strong>
                  Do you want to know how you compare to the average adult in
                  the number of hours spent watching TV?
                </strong>
              </p>
              <button onClick={this.check_avg} type="button" id="avg_btn">
                Check
              </button>
              <p id="result"></p>
            </div>
          </section>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  showAlert = () => {
    var alertThx = "Thank you for participating in the survey!";
    alert(alertThx);
  };
  check_avg = () => {
    var hours = prompt("Enter the number of hours");
    var num = parseFloat(hours);

    if (num > 4) {
      document.getElementById("result").innerHTML =
        "You spend more time watching TV than the average adult!";
    } else if (num === 4) {
      document.getElementById("result").innerHTML =
        "You spend exactly as much time watching TV as the average adult does";
    } else if (num < 4) {
      document.getElementById("result").innerHTML =
        "You spend less time watching TV than the average adult";
    } else {
      document.getElementById("result").innerHTML = "You gave wrong values";
    }
  };
}
export default Home;
