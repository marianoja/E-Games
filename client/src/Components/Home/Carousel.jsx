import React from 'react';

export default function Carousel() {

    return (
        <div id="demo" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <a href="/product/7"><img style={{ maxWidth: "70%" }} src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fdeath-stranding%2Fhome%2FEGS_KojimaProductions_DeathStranding_S1-2560x1440-d57b8f430c573292ea8450e5be7f75a4b4e3f015.jpg" alt="Los Angeles" /></a>
                </div>
                <div class="carousel-item">
                    <a href="/product/5"><img style={{ maxWidth: "70%" }} src="https://store-images.s-microsoft.com/image/apps.3469.65170969132831011.1a6969c2-c209-441f-86d0-c320c947d7bb.fe8618fc-ffbd-48eb-b9c5-d95b2c316f9b?mode=scale&q=90&h=1080&w=1920" alt="Chicago" /></a>
                </div>
                <div class="carousel-item">
                    <a href="/product/3"><img style={{ maxWidth: "75%" }} src="https://pitwalkers.com/wp-content/uploads/2020/06/F1-2020-Codemasters.jpg" alt="New York" /></a>
                </div>
            </div>

            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>

        </div>
    )

}