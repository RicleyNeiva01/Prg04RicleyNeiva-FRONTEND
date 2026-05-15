function Tabela() {
    return (
        <div>
            <section>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Ricley Neiva</td>
                            <td>ricley44@gmail.com</td>
                            <td><span className="badge bg-success">Ativo</span></td>
                            <td>
                                <button className="btn btn-custom btn-sm btn-primary">Editar</button>
                                <button className="btn btn-custom excluir btn-sm">Excluir</button>
                            </td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>Geovana Bastos</td>
                            <td>geovana22@gmail.com</td>
                            <td><span className="badge bg-success">Ativo</span></td>
                            <td>
                                <button className="btn btn-custom btn-sm btn-primary">Editar</button>
                                <button className="btn btn-custom excluir btn-sm">Excluir</button>
                            </td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>Sueli Neiva</td>
                            <td>suelinei2454@gmail.com</td>
                            <td><span className="badge bg-success">Ativo</span></td>
                            <td>
                                <button className="btn btn-custom btn-sm btn-primary">Editar</button>
                                <button className="btn btn-custom excluir btn-sm">Excluir</button>
                            </td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>João Cassio</td>
                            <td>joaobe224@gmail.com</td>
                            <td><span className="badge bg-success">Ativo</span></td>
                            <td>
                                <button className="btn btn-custom btn-sm btn-primary">Editar</button>
                                <button className="btn btn-custom excluir btn-sm">Excluir</button>
                            </td>
                        </tr>

                        <tr>
                            <td>5</td>
                            <td>Antonio Ribeiro</td>
                            <td>antoniocof21@gmail.com</td>
                            <td><span className="badge bg-success">Ativo</span></td>
                            <td>
                                <button className="btn btn-custom btn-sm btn-primary">Editar</button>
                                <button className="btn btn-custom excluir btn-sm">Excluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Tabela;