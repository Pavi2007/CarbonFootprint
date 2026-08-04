import { useEffect } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = () => {

  useEffect(() => {

    if (!window.googleTranslateElementInit) {

      window.googleTranslateElementInit = () => {

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,ta,hi,te,ml,kn,bn,gu,mr,pa,ur,fr,de,es,it,ja,ko,zh-CN,ar",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

      };

    }

    if (!document.getElementById("google-translate-script")) {

      const script = document.createElement("script");

      script.id = "google-translate-script";

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      document.body.appendChild(script);

    }

  }, []);

  return (
    <div id="google_translate_element"></div>
  );

};

export default GoogleTranslate;