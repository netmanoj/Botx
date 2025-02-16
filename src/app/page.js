// src/app/page.js
import AuthWrapper from './components/Auth/AuthWrapper';
import Chat from './components/Chat/Chat';

export default function Home() {
  return (
    <main>
      <AuthWrapper>
        <Chat />
      </AuthWrapper>
    </main>
  );
}