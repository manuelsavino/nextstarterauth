import Head from 'next/head';
import auth0 from './api/utils/auth0';

const ProtectedRoute = ({ user }) => {
  return (
    <div className='container mx-auto mt-5'>
      <Head>
        <title>NextJS Starter</title>
      </Head>
      {user && (
        <a
          className='py-2 px-4 text-white rounded bg-red-500 text-white'
          href='/api/logout'
        >
          Logout
        </a>
      )}
      <h1 className='text-7xl pt-5'>Protected Route</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { user } = (await auth0.getSession(context.req)) || {};

  if (!user) {
    context.res.writeHead(302, {
      Location: '/api/login',
    });
    context.res.end();
    return { props: {} };
  }

  return {
    props: {
      user,
    },
  };
}

export default ProtectedRoute;
