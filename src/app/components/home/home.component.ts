import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormSchema } from 'src/app/interfaces/form-schema';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profileForm:any
  address:any
  formArray:any
  age:number
 
  url='http://localhost:4200/assets/images/profile.png'
  isEmailValid: boolean=false;
  isFnameValid: boolean=false;
  isMobileNoValid: boolean=false;
 
  constructor(private service:HttpService, private router:Router) { }

  ngOnInit() {
    this.address=''
    this.age=20
    this.makeProfile()
   


    console.log(this.url)
  }
  openRegisterModal():void{
    document.getElementById("myModal").style.display="block"
  }

  closeRegisterModal():void{
    document.getElementById("myModal").style.display="none"
  }
  onSubmit(){
 
    console.log(this.url)
    this.service.postProfile(this.profileForm.value).subscribe((response)=>{
      console.log(response)
    })
    localStorage.setItem('reload','true')
  this.router.navigate(['profile'])

  }
  whichaddress(e:any){
    console.log(e.target.value)
    console.log(this.profileForm.get('Address').untouched)

    this.address=e.target.value

  }
  
  profileChange(e:any){
    if(e.target.files){

    //  console.log(e)
      
      var reader =new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.url=event.target.result
        this.makeProfile()        
      }

  
     
    }

  }

  makeProfile(){
    this.profileForm=new FormGroup({
      id:new FormControl(),
      profile:new FormControl(this.url,[Validators.required]),
      FirstName:new FormControl('',[Validators.required]),
      LastName:new FormControl(),
      Email:new FormControl('',[Validators.required]),
      MobileNo:new FormControl('',[Validators.required]),
      Age:new FormControl('',[Validators.required]),
      State:new FormControl('',[Validators.required]),
      Country:new FormControl('',[Validators.required]),
      Address:new FormGroup({
        Home:new FormGroup({
        Address1:new FormControl(),
        Address2:new FormControl()
        
      }),
      Company:new FormGroup({
        Address1:new FormControl(),
        Address2:new FormControl()
        
      })
     
      },[Validators.required]),
      
        tags:new FormControl('',[Validators.required])
      
    });

  }
  EmailValidation(email:any){
    // console.log(this.profileForm.get('Email').touched)
    // console.log(email)
    var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.isEmailValid = regex.test(email);   //test method will check for patern match in 'regex'

        //console.log(this.isEmailValid)
        return this.isEmailValid
  }

  FirstNameValidation(name:any){
   // console.log(this.profileForm.get('FirstName').errors)
    // console.log(email)
    var regex = new RegExp(/^([A-Z,a-z]){1,20}$/);
    this.isFnameValid = regex.test(name);   //test method will check for patern match in 'regex'

        //console.log(this.isEmailValid)
        return this.isFnameValid
  }

  mobileNoChange(mobile:string){
    var regex=new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/)       //	This Pattern is to Validate Mobile Number with 10 digit Number and Countrycode as Optional.
    this.isMobileNoValid=regex.test(mobile)
    return this.isMobileNoValid
  }
}
