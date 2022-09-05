<div class="container">
    <div class="signin">
        <h1 class="title">Title</h1>
        <input type="text" name="id" placeholder="CliendID" />
        <button class="login">Log In</button>
        <a class="register" href="/register">Register</a>
    </div>
</div>

<style>
    h1 {
        margin: 0;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .signin {
        width: max(20rem, 50vw);
        height: max(20rem, 50vh);
        background-color: var(--bl1);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .signin *:not(:first-child) {
        margin-top: 1rem;
    }

    input {
        appearance: none;
        outline: none;
        border: none;
        color: var(--accent-color);
        font-size: 1.25rem;
        background-color: var(--bl5);
        height: 2rem;
        width: 15rem;
        padding-block: 0.25rem;
        padding-inline: 0.5rem;
    }

    .login {
        appearance: none;
        color: var(--accent-color);
        background-color: var(--b7);
        border: none;
        height: 2.5rem;
        width: 5rem;
        border: 0.1rem solid var(--b9);
        border-radius: 0.25rem;

        font-size: 1rem;
    }
    .login:hover {
        background-color: var(--b9);
    }
    .login:active {
        background-color: var(--b8);
    }
</style>
