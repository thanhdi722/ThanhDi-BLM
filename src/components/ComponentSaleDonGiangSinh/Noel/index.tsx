"use client";
import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

export default function Index() {
  const winterWrapperRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const showButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mailContentRef = useRef<HTMLParagraphElement | null>(null);
  const mailSignRef = useRef<HTMLDivElement | null>(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    // START countdown

    // START snowfall
    // const createSnowflake = (
    //   winterWrapper: HTMLElement,
    //   count: number,
    //   prefix = ""
    // ) => {
    //   for (let i = 1; i <= count; i++) {
    //     const snowflake = document.createElement("div");
    //     snowflake.className = `snowflake ${prefix} ${prefix}-${i}`;
    //     winterWrapper.appendChild(snowflake);
    //   }
    // };

    // START fireworks
    // const startFireworks = ({
    //   clientX,
    //   clientY,
    // }: {
    //   clientX: number;
    //   clientY: number;
    // }) => {
    //   const candyCount = 150; // Number of candies per firework
    //   const candies: HTMLDivElement[] = [];
    //   const colors = [
    //     "#ADD8E6",
    //     "#B2F2BB",
    //     "#FFFACD",
    //     "#FFE4E1",
    //     "#FFB6C1",
    //     "#D8BFD8",
    //   ];

    //   for (let i = 0; i < candyCount; i++) {
    //     const candy = document.createElement("div");
    //     candy.classList.add("candy");

    //     // Set random color from the palette
    //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
    //     candy.style.background = randomColor;

    //     // Set random size for the candy
    //     const size = Math.random() * 10 + 10; // Random size between 10px and 20px
    //     candy.style.width = `${size}px`;
    //     candy.style.height = `${size}px`;

    //     // Set random direction for the candy
    //     const angle = Math.random() * 2 * Math.PI;
    //     const distance = Math.random() * 50 + 10; // Random distance
    //     const x = Math.cos(angle) * distance + "vw";
    //     const y = Math.sin(angle) * distance + "vw";
    //     candy.style.setProperty("--x", x);
    //     candy.style.setProperty("--y", y);

    //     // Set the initial position to the click position
    //     candy.style.left = `${clientX - 10}px`;
    //     candy.style.top = `${clientY - 10}px`;

    //     // Add the candy to the body
    //     document.body.appendChild(candy);
    //     candies.push(candy);
    //   }

    //   // Remove candies after the animation ends
    //   setTimeout(() => {
    //     candies.forEach((candy) => candy.remove());
    //   }, 1250);
    // };

    const winterWrapper = winterWrapperRef.current;
    if (winterWrapper) {
      const wrapConfig = [
        { className: "_sm", spanCount: 250 },
        { className: "_md", spanCount: 50 },
        { className: "_lg", spanCount: 50 },
      ];
      // wrapConfig.map(({ className, spanCount }) =>
      //   createSnowflake(winterWrapper, spanCount, className)
      // );

      // Comment out or remove the autoFireworksInterval
      // const autoFireworksInterval = setInterval(() => {
      //   startFireworks({
      //     clientX:
      //       Math.random() *
      //         (window.innerWidth * 0.75 - window.innerWidth * 0.25) +
      //       window.innerWidth * 0.25,
      //     clientY:
      //       Math.random() *
      //         (window.innerHeight * 0.6 - window.innerHeight * 0.25) +
      //       window.innerHeight * 0.25,
      //   });
      // }, 1250);

      // Remove the event listener for fireworks
      // winterWrapper.addEventListener("click", (event) => {
      //   startFireworks(event as MouseEvent);
      //   // clearInterval(autoFireworksInterval);
      // });
    }

    const dialog = dialogRef.current;
    const showButton = showButtonRef.current;
    const closeButton = closeButtonRef.current;
    const mailContent = mailContentRef.current;
    const mailSign = mailSignRef.current;

    const greetings = [
      "Merry Christmas and a Happy New Year! May your days be filled with joy, laughter, and the warmth of loved ones. Don’t forget to leave me some cookies and milk—Santa needs his fuel for all that gift delivering! Stay jolly and bright!",
      "Greetings from the North Pole! I’ve checked my list twice, and you’re on the “Nice” list (of course!). May your Christmas sparkle like Rudolph’s nose and your New Year be as magical as a sleigh ride under the stars. Wishing you stockings full of surprises and hearts full of happiness.",
      "The elves and I are wrapping up the year with one wish for you: a holiday season filled with love, laughter, and lots of snowflakes! Remember, the magic of Christmas isn’t just in the presents, but in the smiles we share. Wishing you a New Year as wonderful as a fresh batch of cookies!",
      "Ready your sleigh, dear friend—it’s time to dash into a holiday season filled with wonder and adventure! May your Christmas be merry, your New Year be bright, and your heart be full of magic. Remember, wherever you go, the spirit of the season follows.",
      "Happy Christmas and a joyful New Year to you! Let this season remind you of all the good in the world—the laughter of children, the kindness of strangers, and the hope in every heart. And don’t forget, the greatest gifts aren’t under the tree—they’re the memories we make together.",
      "Jingle bells, jingle bells, you’re on my way! The reindeer and I are gearing up for a magical night, and I’ve got some goodies with your name on them. May your Christmas be sweet as candy canes and your New Year full of sparkle. Don’t forget to save me a cookie or two!",
    ];

    const signs = [
      "With love,",
      "Yours merrily,",
      "Warmest hugs,",
      "Off to the next chimney,",
      "Stay magical,",
      "Happily yours,",
    ];

    const toggleBodyScroll = (disable: boolean) => {
      if (disable) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    if (showButton && dialog && mailContent && mailSign) {
      showButton.addEventListener("click", () => {
        const randomGreeting =
          greetings[Math.floor(Math.random() * greetings.length)];
        const randomSign = signs[Math.floor(Math.random() * signs.length)];
        mailContent.textContent = randomGreeting;
        mailSign.textContent = randomSign;
        dialog.showModal();
        setOverlayVisible(true);
        toggleBodyScroll(true);
      });
    }

    if (closeButton && dialog) {
      closeButton.addEventListener("click", () => {
        dialog.close();
        setOverlayVisible(false);
        toggleBodyScroll(false);
      });
    }

    return () => {
      if (winterWrapper) {
        // Remove the event listener for fireworks
        // winterWrapper.removeEventListener("click", startFireworks);
      }
      toggleBodyScroll(false);
    };
  }, []);

  return (
    <div className="index-noel-deal-24-12">
      {isOverlayVisible && <div className="overlay-deal-24-12"></div>}
      <div className="mailbox-deal-24-12">
        <div className="basis-deal-24-12"></div>
        <div className="box-deal-24-12">
          <div className="letters-deal-24-12">
            <div className="letter letter-second-deal-24-12">
              <img
                className="letter-image-deal-24-12"
                src="https://img.freepik.com/premium-vector/christmas-mail-postcard-hand-drawn-illustration_514781-2114.jpg"
              />
            </div>
            <div className="letter letter-first-deal-24-12">
              <img
                className="letter-image-deal-24-12"
                src="https://www.shutterstock.com/image-vector/christmas-new-year-postcard-wish-260nw-761840683.jpg"
              />
            </div>
          </div>
          <div className="box-title-deal-24-12">
            <div className="font-sans-serif-deal-24-12">letters from</div>
            <div className="font-script-deal-24-12">Santa</div>
            <div className="font-sans-serif-deal-24-12">for</div>
            <div className="font-script-deal-24-12">you</div>
          </div>
        </div>
      </div>
      <div
        className="winter-wrapper-deal-24-12"
        id="winter-wrapper"
        ref={winterWrapperRef}
      ></div>
      <div className="ground-deal-24-12"></div>

      <dialog className="mail-deal-24-12" id="mail" ref={dialogRef}>
        <div className="mail-inner-deal-24-12">
          <button
            className="mail-close-deal-24-12"
            autoFocus
            id="mailClose"
            ref={closeButtonRef}
          >
            X
          </button>
          <p className="mail-title-deal-24-12">Ho ho ho!</p>
          <p id="mailContent" ref={mailContentRef}>
            Bạch Long Mobile chúc bạn có một Giáng sinh an lành và hạnh phúc
          </p>
          <div id="mailSign" ref={mailSignRef}>
            Stay magical,
          </div>
          <div>
            <span className="font-script-deal-24-12">Santa</span> 🎅
          </div>
        </div>
      </dialog>
      <button
        className="mailbox-shadow-deal-24-12"
        id="mailbox"
        ref={showButtonRef}
      ></button>
    </div>
  );
}
