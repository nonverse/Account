import {createInertiaApp} from "@inertiajs/react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "@/state/store.js";

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./**/*.jsx', {eager: true})
        return pages[`./${name}.jsx`]
    },
    setup({el, App, props}) {
        createRoot(el).render(
            <Provider store={store}>
                <App {...props}/>
            </Provider>
        )
    }
})
