export class Bankkartya{
    szam: string;
    lejarat: string;
    kod: string;
}

export class Felhasznalo{
    nev: string;
    szamlazasi_cim: string;
    szallitasi_cim: string;
    kuponkod: string;
    bankkartya: Bankkartya;
}