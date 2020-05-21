class Navbar extends HTMLElement
{
    constructor()
    {
        super();
    }

    showLayout()
    {
        this.innerHTML = `  <nav class="white" role="navigation">
                                <div class="nav-wrapper container col m-12">
                                  <a href="#" class="brand-logo black-text text-darken-1" id="logo-container">Bolibal</a>
                                  <a href="#" class="sidenav-trigger black-text text-darken-1" data-target="nav-mobile">☰</a>
                                  
                                  <ul class="topnav right hide-on-med-and-down"></ul>
                                  <ul class="sidenav" id="nav-mobile"></ul>
                                </div>
                            </nav>`;
    }

    connectedCallback()
    {
        this.showLayout();
    }
}

customElements.define("nav-bar", Navbar);