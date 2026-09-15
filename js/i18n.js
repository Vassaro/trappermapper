const i18n = {
    defaultLanguage: "sv",
    supportedLanguages: ["en", "sv"],

    language: null,
    translations: {},

    async init() {
        const savedLanguage = localStorage.getItem("language");

        const browserLanguage =
            navigator.language?.split("-")[0];

        if (this.supportedLanguages.includes(savedLanguage)) {
            this.language = savedLanguage;
        } else if (this.supportedLanguages.includes(browserLanguage)) {
            this.language = browserLanguage;
        } else {
            this.language = this.defaultLanguage;
        }

        await this.load(this.language);
    },

    async load(language) {
        if (!this.supportedLanguages.includes(language)) {
            language = this.defaultLanguage;
        }

        const response = await fetch(
            `./locales/${language}.json`
        );

        if (!response.ok) {
            throw new Error(
                `Could not load language: ${language}`
            );
        }

        this.translations = await response.json();
        this.language = language;

        localStorage.setItem("language", language);

        document.documentElement.lang = language;
    },

    async setLanguage(language) {
        if (language === this.language) {
            return;
        }

        await this.load(language);

        updatePage();
        updateLanguageButtons();
    },

    t(key) {
        const value = key
            .split(".")
            .reduce((object, part) => object?.[part], this.translations);

        return value ?? key;
    },

    localized(value, fallback = this.defaultLanguage) {
        if (!value || typeof value !== "object") {
            return value ?? "";
        }

        return (
            value[this.language] ??
            value[fallback] ??
            Object.values(value)[0] ??
            ""
        );
    }
};

function updatePage() {
    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {
            const key = element.dataset.i18n;

            element.textContent = i18n.t(key);
        });
}

function setupLanguageButtons() {
    document
        .querySelectorAll("[data-language]")
        .forEach(button => {

            button.addEventListener("click", async () => {
                await i18n.setLanguage(
                    button.dataset.language
                );
            });

        });
}

function updateLanguageButtons() {
    document
        .querySelectorAll("[data-language]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.language === i18n.language
            );

        });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


async function init() {
    await i18n.init();
    setupLanguageButtons();
    updatePage();
    updateLanguageButtons();
    console.log(i18n.language)

}

init().catch(error => {
    console.error(error);
});

export default i18n;