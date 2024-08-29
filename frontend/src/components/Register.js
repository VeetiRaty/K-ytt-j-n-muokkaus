// src/components/Register.js
import React, { useState } from 'react';

// Register-komponentti käsittelee käyttäjän rekisteröinnin
function Register() {
    // useState hook luo tilan käyttäjän tiedoille: käyttäjänimi, salasana ja bio
    const [user, setUser] = useState({ username: '', password: '', bio: '' });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        // Päivitetään vastaava kenttä tilassa
    };
    // handleSubmit-funktio käsittelee lomakkeen lähetyksen

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(false);  // Nollataan onnistumisviesti ennen uutta yritystä

        // Tulostetaan rekisteröityneen käyttäjän tiedot konsoliin
        console.log('Käyttäjä rekisteröitynyt:', user);
        // Näytetään ilmoitus onnistuneesta rekisteröinnistä
        alert('Käyttäjä rekisteröityi onnistuneesti');

         try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Käyttäjä rekisteröitynyt:', data);
                setSuccess(true);  // Asetetaan onnistumisviesti
                // Tyhjennä lomake kentät rekisteröinnin jälkeen
                setUser({ username: '', password: '', bio: '' });
            } else {
                throw new Error('Rekisteröinti epäonnistui');
            }
        } catch (err) {
            console.error('Virhe rekisteröinnissä:', err);
            setError('Rekisteröinti epäonnistui. Yritä uudelleen.');
        }
    };

    // Lomakkeen renderöinti
    return (
        <div>
            <h2>Rekisteröinti</h2>

            {/* Näytetään virheilmoitus, jos rekisteröinti epäonnistuu */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Näytetään onnistumisviesti, jos rekisteröinti onnistuu */}
            {success && <p style={{ color: 'green' }}>Rekisteröinti onnistui!</p>}

            {/* Lomakkeen lähetys kutsuu handleSubmit-funktiota */}
            <form onSubmit={handleSubmit}>
                <label>
                    Käyttäjänimi:
                    {/* Tekstikenttä, joka päivittää username-tilan */}
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required  // Pakollinen kenttä
                    />
                </label>
                <br />
                <label>
                    Salasana:
                    {/* Salasanojen syöttökenttä, joka päivittää password-tilan */}
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required  // Pakollinen kenttä
                    />
                </label>
                <br />
                <label>
                    Bio:
                    {/* Tekstialue, joka päivittää bio-tilan */}
                    <textarea
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {/* Rekisteröinti-painike */}
                <button type="submit">Rekisteröidy</button>
            </form>
        </div>
    );
}

export default Register;
