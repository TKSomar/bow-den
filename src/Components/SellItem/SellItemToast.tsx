import { ReactElement } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const SellItemToast: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }): ReactElement => {

  return (
    <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1 }}
    >
        <Toast show={show} onClose={onHide} bg="success" className="text-white" delay={2000} autohide>
        <Toast.Header closeButton={false}>
            <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
            />
            <strong className="me-auto">Bow listed!</strong>
        </Toast.Header>
        <Toast.Body>Great news! Your bow is now listed for sale!</Toast.Body>
        </Toast>
    </ToastContainer>
  );
}

export default SellItemToast;