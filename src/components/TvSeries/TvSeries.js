import React, { Component } from "react";

class TvSeries extends Component {
  constructor(props) {
    super(props);
    this.img_mrrobot = React.createRef();
    this.img_sherlock = React.createRef();
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="top">
          <div className="text_tvseries">
            <h1>Tv series Recommendations</h1>
          </div>
          <div className="dropdown drp">
            <div className="dropbtn">Navigate</div>
            <div className="dropdown-one">
              <div id="link1" className="dItem">
                Review
                <div className="dropdown-two">
                  <a className="dItem" href="#sherlock">
                    Sherlock
                  </a>
                  <a className="dItem" href="#mrrobot">
                    Mr Robot
                  </a>
                </div>
              </div>
            </div>
          </div>
          <section className="diff">
            <div id="difusion">
              <img
                className="bottom"
                src={require("../../assets/images/tvseries.jpg")}
                alt="poster"
                id="img_sizes_tvseries"
              />
              <img
                className="top"
                src={require("../../assets/images/tv.jpg")}
                alt="movies poster"
                id="img_sizes_tvseries"
              />
            </div>
          </section>
        </section>

        <section className="reviews">
          <div className="text_tvseries">
            <h3 id="recenzje">Reviews</h3>
          </div>
          <img
            src="https://fwcdn.pl/fpo/89/92/528992/7864164.3.jpg"
            width="150"
            height="200"
            alt="sherlock"
            ref={this.img_sherlock}
            onMouseOver={this.zoomin_sherlock}
            onMouseOut={this.zoomout_sherlock}
          />
          <section className="Sherlock" id="media_query">
            <h3 id="sherlock">Sherlock</h3>
            <summary>Review</summary>
            <div>
              There is no person who has not heard of Sherlock Holmes. No wonder
              that various directors have decided to adapt the detective's
              adventures. One of them is the series "Sherlock". The action of
              the series takes place in the present. Military doctor, John
              Watson, after returning from a mission in Afghanistan, as a result
              of a coincidence meets detective Sherlock Holmes, with whom he
              soon lives on Baker Street. Soon they are together solving
              puzzles. A very important, if not the most important advantage of
              the series is the cast and acting. Benedict Cumberbatch fits
              perfectly into the role of Sherlock, taking the art of acting to
              the heights of absolute perfection. It should be added that the
              whole galaxy of second and third characters is also presented
              extremely skillfully, not only serving as a background for the
              actions of the two main protagonists. The well-composed music,
              neatly building the atmosphere and tension, also makes a great
              impression. After watching the first season, I knew that
              "Sherlock" would be high on my personal series rankings. The BBC
              production has everything that should be characteristic of any
              good cinema, i.e. interesting, perfectly written characters, a
              nuanced story and atmosphere, which captivates from the first
              minute. I sincerely recommend this series.
            </div>
            <aside>
              <a href="https://www.youtube.com/watch?v=Nj7ZSUkTTVI">
                See trailer
              </a>
              <br />
              <a
                href="downloads/muzyka_z_serialu.mp3"
                download="sherlock holmes soundtrack"
              >
                Download music from series
              </a>
            </aside>
          </section>
          <div className="img_mrrobot">
            <img
              src="https://www.galeriaplakatu.com/img/imagecache/87001-88000/602x904_product_media_87001-88000_robot_kopia_min-j.webp"
              width="150"
              height="200"
              alt="mrrobot"
              ref={this.img_mrrobot}
              onMouseOver={this.zoomin_mrrobot}
              onMouseOut={this.zoomout_mrrobot}
            />
          </div>
          <section className="Mr_robot" id="media_query">
            <h3 id="mrrobot">Mr. Robot</h3>
            <summary>Review</summary>
            <div>
              <strong> Mr. Robot </strong> is an American production created by
              Sam Esmail with the help of Anonymous Content. The series tells
              the story of a destroyed world. A world where people are driven by
              selfish motives, dominated by large corporations that run the life
              of every average person. The main character, Eliot Alderson, is a
              young programmer suffering from social phobia. He works in a
              company dealing with online security, but after work, he devotes
              himself to his passion - hacking. Production is a logical puzzle,
              which on every step tries to deceive the viewer. It affects the
              human subconscious and mocks it at every possible opportunity.
              Dialogues and scenes are full of the obvious references to pop
              culture, cult productions such as: "Matrix", "Fight Club" or
              "Fight Club". The production's strength is the cast, and above all
              the main character - Rami Malek, who plays Eliot Alderson. An
              actor so charismatic, so perfectly reflecting the character of the
              character. On the one hand, hidden in itself, manifesting features
              of autism, and on the other damning reality and extremely lonely.
              I am sure that this already cult production will become the
              subject of many discussion and interpretation among pop culture
              fans. I personally recommend it. And you watched this series? Do
              you have it in your plans? Write to us
            </div>
            <aside>
              <br />
              <a href="https://www.youtube.com/watch?v=xIBiJ_SzJTA">
                See trailer
              </a>
              <br />
              <a
                href="https://fwcdn.pl/fpo/37/95/733795/7689969.3.jpg"
                download="Mr.Robot"
              >
                Download music from series
              </a>
            </aside>
          </section>
        </section>
      </div>
    );
  }

  zoomin_sherlock = () => {
    const imgSherlock = this.img_sherlock.current;
    imgSherlock.style.height = "230px";
    imgSherlock.style.width = "200px";
  };

  zoomout_sherlock = () => {
    const imgSherlock = this.img_sherlock.current;
    imgSherlock.style.height = "210px";
    imgSherlock.style.width = "150px";
  };

  zoomin_mrrobot = () => {
    const imgMrrobot = this.img_mrrobot.current;
    imgMrrobot.style.height = "230px";
    imgMrrobot.style.width = "200px";
  };

  zoomout_mrrobot = () => {
    const imgMrrobot = this.img_mrrobot.current;
    imgMrrobot.style.height = "210px";
    imgMrrobot.style.width = "150px";
  };
}
export default TvSeries;
