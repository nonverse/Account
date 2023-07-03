import MessageBox from "@/components/MessageBox.jsx";
import InLineButton from "@/elements/InLineButton.jsx";

const VerifyEmail = () => {

    return (
        <MessageBox id="verify-email" weight="danger">
            Your e-mail is not verified. <InLineButton onClick={() => {
            window.location = '/personal-info?state={"modal":{"value":{"id":"update_email"}}}'
        }}>Click here</InLineButton> to change your e-mail or re-send the verification
        </MessageBox>
    )
}

export default VerifyEmail
