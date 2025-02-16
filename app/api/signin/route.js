import Credential from '@/utils/Credential';
import { getDB } from '@/lib/db';
import Auth from '@/utils/Auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Extract data from request body
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    if (user) {
      const isValid = await Credential.compare(password, user.password);
      if (isValid) {
        const authToken = await Auth.generateToken({
          id: user.id,
          role: user.role,
        });
        const userData = {
          authToken,
          role: user.role,
        };

        return new Response(
          JSON.stringify({
            message: 'Signin success',
            data: { user: userData },
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(JSON.stringify({ message: 'Invalid email/password' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
