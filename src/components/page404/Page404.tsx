import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ height: '100vh' }}>
      <p
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '26px',
          paddingTop: '300px',
          marginBottom: '20px',
          color: ' rgba(34, 34, 34, 0.808)',
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          color: '#f4b838',
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
