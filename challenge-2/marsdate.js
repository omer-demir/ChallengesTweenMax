class MarsDate {
    constructor() {
      var m = this.solveDate(arguments);
      this.millis = m.millis;
      this.json = m.dateObject;
      this.earthDate = m.earthDate;
    }
    setTimezone(a){
      this.json.Z = MarsDate.i18n.timezones[a];
      var p = (a[0]==="+") ? 1 : -1;
      var i = (a[1]*10 + 1*a[2])*3600000*p;
      var mi = (i+(1*this.millis + 11081343958887))/86400000;
      var m = this.getDateFromMSD(mi);
      this.json = m;
      this.json.Z = MarsDate.i18n.timezones[a];
      this.string = this.formatDate(MarsDate.i18n.toString);
    }
  
    solveDate(a){
      return this.solveFromEarthDate(a[0]);
    }
  
    solveFromEarthDate(d){
      var m = {};
      m.earthDate = d || new Date();
      m.j2000 = this.getj2000FromEarthDate(m.earthDate);
      m.MSD = this.getMSDFromj2000(m.j2000);
      m.dateObject = this.getDateFromMSD(m.MSD);
      m.millis = Math.floor(m.MSD*86400000 - 11081343958887);
      return m
    }
    /*
    Earth Date to Date Conversion Functions
    Earth Date -> j2000 -> MSD -> Date/MTC
    */
  
    getj2000FromEarthDate(d){
      return 2440587.5 + d.getTime()/86400000 + 67.184/86400 - 2451545;
    }
  
    getMSDFromj2000(d){
      return (d-4.5)/(88775244.147/86400000) + 44796.0 - 0.0009626 + 94129;
    }
  
    getDateFromMSD(d){
      var m = {};
      m.H = Math.floor((24*d) % 24);
      m.M = Math.floor((1440*d) % 60);
      m.M = Math.floor((1440*d) % 60);
      m.s = Math.floor((86400*d) % 60);
      m.l = Math.floor((86400000*d) % 1000);
      m.n = Math.floor(d);
      for(m.y = 0; m.n>669; m.y++){
        if(this.isLeapYear(m.y)){
          m.n-=669;
        } else {
          m.n-=668;
        }
      }
      m.ly = this.isLeapYear(m.y);
      if(!m.ly && m.n>668){
        m.y++;
        m.n=1;
      }
      m.n = Math.floor(m.n);
      m.q = Math.floor(m.n/167);
      m.q = (m.q>3) ? 3 : m.q;
      m.m =  Math.floor(m.q*6 + (m.n-m.q*167)/28);
      m.m = (m.m>23) ? 23 : m.m;
      m.d = m.n - m.q*167 - ((m.m%6)*28) + 1;
      return this.createDateObjects(m);
    }
  
    /*
      Date processing functions
    */
  
    pad(n, l) {
      var s = n.toString();
      l = l || 2;
      while (s.length < l) {
        s = '0' + s;
      }
      return s;
    }
  
    createDateObjects(m){
      if(!m.q){
        m.q = Math.ceil((m.m+1)/6) - 1;
      }
      if(!m.n){
        m.n = m.d + (m.m*28) - Math.floor(m.m/6);
      }
      if(!m.l){
        m.l = "000";
      }
      m.HH = this.pad(m.H, 2);
      m.h = m.H%12;
      m.h = (m.h===0) ? 12 : 0;
      m.hh = this.pad(m.h, 2);
      m.MM = this.pad(m.M, 2);
      m.TT = (m.H>11) ? 'PM':'AM';
      m.T = m.TT[0];
      m.tt = m.TT.toLowerCase();
      m.t = m.tt[0];
      m.ss = this.pad(m.s, 2);
      m.L = Math.floor(m.l/10);
      m.dd = this.pad(m.d, 2);
      m.N = (m.d-1)%7;
      m.yy = this.pad((m.y%100),2);
      m.yyy = m.y;
      m.yyyy = this.pad(m.y, 4);
      m.W = m.m*4 + Math.ceil(m.d/7);
      m.mm = this.pad(m.m,2);
      m.l = this.pad(m.l, 3);
      return m;
    }
  
    isLeapYear(i){
        return (i%500==0 || i%10==0 && i%100!=0 || i%2!=0);
    }
  }