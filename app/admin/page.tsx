import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { useSession } from 'next-auth/react'
import SignInButton from '../components/SignInButton'

export default function Page() {
  ;<SignInButton />
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getServerSession(
//         context.req,
//         context.res,
//         authOptions
//       ),
//     },
//   }
// }
