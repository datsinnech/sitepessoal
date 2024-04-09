import Backend from 'i18next-http-backend'

const lngs = {
    pt: { nativeName: 'Português' },
    fr: { nativeName: 'Français' },
    de: { nativeName: 'Deutsch'},
    lb: { nativeName: 'Lëtzebuerg'}
  };
  
  const rerender = () => {
    
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('body').localize();

    $('title').text($.t('head.title'))
    $('meta[name=description]').attr('content', $.t('head.description'))
  }


$(function () {
    // use plugins and options as needed, for options, detail see
    // https://www.i18next.com
    i18next
        // detect user language
        // learn more: https://github.com/i18next/i18next-browser-languageDetector
        .use(i18nextBrowserLanguageDetector)
        // init i18next
        // for all options read: https://www.i18next.com/overview/configuration-options
        .use(Backend)
        .init({
            debug: true,
            fallbackLng: 'en',
            backend: {
                // for all available options read the backend's repository readme file
                loadPath: '../assets/js/locales/{{lng}}/{{ns}}.json'
              }
          
        }, (err, t) => {
            if (err) return console.error(err);

            // for options see
            // https://github.com/i18next/jquery-i18next#initialize-the-plugin
            jqueryI18next.init(i18next, $, { useOptionsAttr: true });


            // fill language switcher
            Object.keys(lngs).map((lng) => {
                const opt = new Option(lngs[lng].nativeName, lng);
                if (lng === i18next.resolvedLanguage) {
                    opt.setAttribute("selected", "selected");
                }
                $('#languageSwitcher').append(opt);
            });
            $('#languageSwitcher').change((a, b, c) => {
                const chosenLng = $(this).find("option:selected").attr('value');
                i18next.changeLanguage(chosenLng, () => {
                    rerender();
                });
            });

            rerender();
        });

    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('body').localize();
});
