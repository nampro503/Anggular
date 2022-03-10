import {Component} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
@Component({
  selector:"current-weather",
  templateUrl:"./currentweather.component.html"
})
export class CurrentWeatherComponent{
  weather = {
    city:"Hanoi, Vietnam",
    temp: 15,
    hump: 95,
    press: 1005,
    desc:"Trời rét, không sương mù, không mây",
    icon:"04n"
  }
  constructor(private http: HttpClient) {}// hàm khởi tạo, chạy trước khi sinh ra giao diện
  ngOnInit(){ // sẽ tự động chạy hàm này sau khi tạo thành giao diện xong
    // lấy dữ liệu từ api và cho vào giao diện
    let url = "https://api.openweathermap.org/data/2.5/weather";
    let parameters = new HttpParams();
    parameters = parameters.append("q","Hanoi,vietnam");
    parameters = parameters.append("appid","09a71427c59d38d6a34f89b47d75975c");
    parameters = parameters.append("units","metric");
    this.http.get(url,{
      params:parameters
    }).subscribe((rs:any)=>{
      this.weather.city = rs.name+", "+rs.sys.country;
      this.weather.temp = rs.main.temp;
      this.weather.hump = rs.main.humidity;
      this.weather.press = rs.main.pressure;
      this.weather.desc = rs.weather[0].description;
      this.weather.icon = rs.weather[0].icon;
    })
  }
}
