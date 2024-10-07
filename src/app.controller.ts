import { Body, Controller, Get, HttpRedirectResponse, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Felhasznalo} from './Felhasznalo.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  #Felhasznalok: Felhasznalo[] = [];

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return{
      data:{},
      errors:[]
    }
  }


  @Post("rendeles")
  rendeles(
    @Body() Felhasznalo:Felhasznalo,
    @Res() response: Response)
  {

    console.log(Felhasznalo)
    let errors=[];
    
    if(!Felhasznalo.nev||!Felhasznalo.szamlazasi||!Felhasznalo.kuponkod||!Felhasznalo.szallitasi||!Felhasznalo.lejarat||!Felhasznalo.szam||!Felhasznalo.kod){
      errors.push("Minden mezőt ki kell tölteni!")
    }
    if(!/^[A-Z]{2}-\d{4}$/.test(Felhasznalo.kuponkod)){
      errors.push("kuponformat: BB-SSSS");
    }
    if(!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(Felhasznalo.szam)){
      errors.push("kártyaszámformat: XXXX-XXXX-XXXX-XXXX");
    }
    if(!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(Felhasznalo.lejarat)){
      errors.push("lejáratformat: HH/ÉÉ");
    }
    if(!/^\d{3}$/.test(Felhasznalo.kod)){
      errors.push("kódformat: XXX")
    }


    if (errors.length > 0) {
      response.render('index', {
        data: Felhasznalo,
        errors
      })
      return{
        errors
      }
    }
    
    const Rendeles: Felhasznalo = {
      nev: Felhasznalo.nev,
      szamlazasi: Felhasznalo.szamlazasi,
      szallitasi: Felhasznalo.szallitasi,
      kuponkod: Felhasznalo.kuponkod,
      szam: Felhasznalo.szam,
      lejarat: Felhasznalo.lejarat,
      kod: Felhasznalo.kod
    }
    this.#Felhasznalok.push(Rendeles);
    console.log(this.#Felhasznalok);
    return response.redirect('/success')

  }


  
  @Get('success')
  @Render('success')
  rSuccess(){
    return;
  }
  
}
