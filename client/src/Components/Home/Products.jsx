import React from 'react';

export default function Products() {

    return (
        <div style={{ marginTop: "50px", marginBottom: "60px" }} className="container">
            <div className="row">
                <h2 style={{ margin: "auto" }}>Release Games</h2>
            </div>
            <div style={{ marginTop: "35px", marginBottom:"70px" }} className="row">
                <div className="col-sm">
                    <a href="/product/9"> <img src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Ffar-cry-5%2Fgold-edition%2FGLD_Image_Hero_Carrousel-1920x1080-e640f6f18caff2a624776dc93110aef701c74308.jpg?h=1080&resize=1&w=1920" alt="" /></a>
                    <h3>Far Cry 5</h3>
                </div>
                <div className="col-sm">
                    <a href="/product/13"><img src="https://i.ytimg.com/vi/qRc1nPG7qXA/maxresdefault.jpg" alt="" /></a>
                    <h3>Overwatch 2</h3>
                </div>
                <div className="col-sm">
                    <a href="/product/14"><img style={{ maxWidth: "100%" }} src="https://images2.alphacoders.com/926/thumb-1920-926738.jpg" alt="" /></a>
                    <h3>Diying Light 2</h3>
                </div>
            </div>
            <div className="row ">
                <h2 style={{ margin: "auto", marginBottom:"30px"}}>Featured Games</h2>
            </div>
            <div className="row">
                <div className="col">
                    <a href="/product/4"><img src="https://wallpapercave.com/wp/wp4661397.jpg" alt="" /></a>
                    <h3>WWE 2K20</h3>
                </div>
                <div className="col">
                    <a href="/product/8"><img src="https://www.hd-tecnologia.com/imagenes/articulos/2020/03/Resident-Evil-3-Remake-tendr%C3%A1-un-modo-Game-Plus-su-campa%C3%B1a-durar%C3%A1-5-horas-1280x720.jpg" alt="" /></a>
                    <h3>Resident Evil 3</h3>
                </div>
            </div>
        </div>
    )

}