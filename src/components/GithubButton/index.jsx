function GithubButton() {
  return (
    <div
      className="github-btn"
      onClick={() =>
        window.open("https://github.com/lnardon/3DSynth", "_blank")
      }
    >
      <img className="github-logo" src="./logo.png" alt="Github Logo" />
      View on Github
    </div>
  );
}

export default GithubButton;
