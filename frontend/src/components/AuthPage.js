import React, { useState } from 'react';
import './AuthPage.css'; // Vamos criar este arquivo CSS depois

const AuthPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Para alternar entre login e cadastro
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            // Salvar o token no localStorage
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.name);
            
            // Redirecionar para a página inicial
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer cadastro');
            }

            // Salvar o token no localStorage
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.name);
            
            // Redirecionar para a página inicial
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-container">
                <div className="auth-image-section">
                    {/* Placeholder para a imagem de fundo */}
                    <div className="saude-logo">Saúde +</div>
                    {/* A imagem real pode ser definida via CSS */}
                    <p className="auth-image-copyright text-sm text-white text-center p-2 absolute bottom-0 left-0 right-0 bg-black bg-opacity-50">
                        © 2025 Saude+. Todos os direitos reservados.
                    </p>
                </div>
                <div className="auth-form-section">
                    <h2>Acesso ao Saúde +</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={isLogin ? handleLogin : handleRegister}>
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {isLogin && (
                            <div className="forgot-password">
                                <a href="#">Esqueceu a senha?</a>
                            </div>
                        )}
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastre-se')}
                        </button>
                    </form>
                    <div className="auth-switch">
                        <span>ou</span>
                        <button className="btn-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Cadastre-se!' : 'Fazer Login!'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage; 