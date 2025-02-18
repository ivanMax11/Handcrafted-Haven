//import { signOut } from 'next-auth/react';
//import { getServerSession } from 'next-auth';
import CreateProductForm from '@/ui/shop/create-product-form';
//import { redirect } from 'next/navigation';

export default async function Form() {
  // ** get correct file path **
  // const session = await getServerSession();
  // if (!session || !session.user) {
  //   redirect('//api/auth/signin');
  // }

  return (
    <div>
      <CreateProductForm />
    </div>
  );
}
