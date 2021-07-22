
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormSchema } from 'src/app/interfaces/form-schema';
import { HttpService } from 'src/app/services/http.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

userProfile:any=[]
image:any
address:string
url='http://localhost:4200/assets/images/profile.png'
  profileForm: FormGroup;

  isEmailValid: boolean=false;
  isFnameValid: boolean=false;
  isMobileNoValid: boolean=false;
  constructor(private service:HttpService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('reload')){
      location.reload()
      localStorage.removeItem('reload')
    }

    this.address=''
    this.makeProfile()
    this.getuserprofile()


    
  }
  getuserprofile(){
    this.service.getProfile().subscribe((data:FormSchema)=>{
      this.userProfile=data
    //  console.log(this.userProfile.length)
    //  console.log(data)
   })
  }
 

  openRegisterModal():void{
    document.getElementById("myModal").style.display="block"
    this.service.getUserProfile(this.userProfile[this.userProfile.length-1].id).subscribe((update:FormSchema)=>{
      this.url=update.profile
      console.log(update)
      this.getValueinForm(update)
    })

  }

  closeRegisterModal():void{
    document.getElementById("myModal").style.display="none"
  }
  onSubmit(){
    this.service.editProfilePhoto(this.userProfile[this.userProfile.length-1].id,this.profileForm.value).subscribe((response:FormSchema)=>
    console.log(response)  
    )
    document.getElementById("myModal").style.display="none";
    location.reload()
   
  }
  whichaddress(e:any){
    this.address=e.target.value

  }
  EditPhoto(id:number,e:any){
  console.log(id)
 if(e.target.files){
  var reader =new FileReader()
  reader.readAsDataURL(e.target.files[0])
  reader.onload=(event:any)=>{
    this.image=event.target.result
    this.updateUserProfile()
    this.service.editProfilePhoto(id,this.userProfile[this.userProfile.length-1]).subscribe((res)=>{
    //console.log(res)
   

    
     
    })
}
  }
}

updateUserProfile(){
  this.userProfile[this.userProfile.length-1].profile=this.image
  this.userProfile[this.userProfile.length-1].FirstName=this.userProfile[this.userProfile.length-1].FirstName
  this.userProfile[this.userProfile.length-1].LastName=this.userProfile[this.userProfile.length-1].LastName
  this.userProfile[this.userProfile.length-1].Email=this.userProfile[this.userProfile.length-1].Email
  this.userProfile[this.userProfile.length-1].MobileNo=this.userProfile[this.userProfile.length-1].MobileNo
  this.userProfile[this.userProfile.length-1].Age= this.userProfile[this.userProfile.length-1].Age
  this.userProfile[this.userProfile.length-1].State= this.userProfile[this.userProfile.length-1].State
  this.userProfile[this.userProfile.length-1].Country=this.userProfile[this.userProfile.length-1].Country
  this.userProfile[this.userProfile.length-1].Address.Home.Address1=this.userProfile[this.userProfile.length-1].Address.Home.Address1
  this.userProfile[this.userProfile.length-1].Address.Home.Address2= this.userProfile[this.userProfile.length-1].Address.Home.Address2
  this.userProfile[this.userProfile.length-1].Address.Company.Address1=this.userProfile[this.userProfile.length-1].Address.Company.Address1
  this.userProfile[this.userProfile.length-1].Address.Company.Address2=this.userProfile[this.userProfile.length-1].Address.Company.Address2
  this.userProfile[this.userProfile.length-1].Address.tags=this.userProfile[this.userProfile.length-1].Address.tags

}
makeProfile(){
 
  this.profileForm=new FormGroup({
    id:new FormControl(),
    profile:new FormControl(''),
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
getValueinForm(update:FormSchema){
  this.profileForm.patchValue({

   
    profile:update.profile,
    FirstName:update.FirstName,
    LastName:update.LastName,
    Email:update.Email,
    MobileNo:update.MobileNo,
    Age:update.Age,
    State:update.State,
    Country:update.Country,
    Address:{
      Home:{
      Address1:update.Address.Home.Address1,
      Address2:update.Address.Home.Address2
      
    },
    Company:{
      Address1:update.Address.Company.Address1,
      Address2:update.Address.Company.Address2
      
    }
    },
    
      tags:update.tags
  })

}

EmailValidation(email:any){
  var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  this.isEmailValid = regex.test(email);   //test method will check for patern match in 'regex'
      return this.isEmailValid
}

FirstNameValidation(name:any){
  console.log(this.profileForm.get('FirstName').errors)
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
