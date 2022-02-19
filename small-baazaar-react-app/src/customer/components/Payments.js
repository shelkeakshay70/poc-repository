import { useHistory } from 'react-router-dom';

const Payments = () => {
  const history = useHistory();
  const successClickHandle = (e) => {
    e.preventDefault();
    history.push('/order-success');
  };

  const failureClickHandle = (e) => {
    e.preventDefault();
    history.push('/order-fail');
  };
  return (
    <div>
      <button className="btn btn-success" onClick={successClickHandle}>
        Payment Success
      </button>
      <button className="btn btn-danger" onClick={failureClickHandle}>
        Payment Failure
      </button>
    </div>
  );
};

export default Payments;
