type ToastMessage={
    message: string;
    type: "SUCCESS"|"ERROR"
}
type AppContext={
    showToast: (toastMessage: ToastMessage)=> void;

}
// when app load first time context will always be by default undefined

const AppContext = React.createContext<AppContext | undefined>(undefined)