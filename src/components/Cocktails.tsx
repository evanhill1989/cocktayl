import { cocktailLists, mockTailLists } from "../../constants";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";

const Cocktails = () => {
  useGSAP(() => {
    const leafTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    leafTl
      .from("#c-left-leaf", {
        y: 200,
        x: -200,
      })
      .from(
        "#c-right-leaf",
        {
          y: 200,
          x: 100,
        },
        "<"
      );
  });

  return (
    <section id="cocktails" className="noisy">
      <img
        src="/images/cocktail-left-leaf.png"
        alt="left-leaf"
        id="c-left-leaf"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="right-leaf"
        id="c-right-leaf"
      />
      <div className="list">
        <div className="popular">
          <div>
            <h2>Most popular cocktails:</h2>
            <ul>
              {cocktailLists.map((drink) => (
                <li key={drink.name}>
                  <div className="md:me-28">
                    <h3>{drink.name}</h3>
                    <p>
                      {drink.country} | {drink.detail}
                    </p>
                  </div>
                  <span>- {drink.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="loved">
          <div>
            <h2>Most loved mocktails:</h2>
            <ul>
              {mockTailLists.map((drink) => (
                <li key={drink.name}>
                  <div className="md:me-28">
                    <h3>{drink.name}</h3>
                    <p>
                      {drink.country} | {drink.detail}
                    </p>
                  </div>
                  <span>- {drink.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
