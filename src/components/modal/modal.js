import {Button, Modal} from "react-bootstrap";
import http from "../../plugins/http";
import MainContext from "../../context/userContext";
import {useContext, useRef} from "react";
function MyVerticallyCenteredModal(props) {
    const {getUser, setUser} = useContext(MainContext)
    const pictureRef = useRef()

    async  function setPicture(){


            const picture = {
                profileImage : pictureRef.current.value,
                email : getUser.email,

            };
        console.log(picture)
            try {
                const res = await http.post(picture, "updatePicture");
                if(res.success){
                    setUser(res.updatedUser)
                }

                // if (!res.error) {
                //     setErrorMessage("");
                // } else {
                //     setErrorMessage(res.message);
                // }
            } catch (error) {
                console.log(error);
            }

        }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change your profile picture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Picture link</h4>
                <p>
                    <input  ref={pictureRef} placeholder="link"/>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={setPicture}>Add</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default MyVerticallyCenteredModal