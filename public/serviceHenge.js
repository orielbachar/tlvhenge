app.factory('serviceHenge', ['$http', function ($http) {

  var final = [];

  var hengeMoment = [];

  var hengeStreet = [
{"streetName":"Bograshov, Tel Aviv","streetAngle":299,"xW":32.078043,"yW":34.76765,"xE":32.074106,"yE":34.775262},
{"streetName":"HaShalom, Tel Aviv","streetAngle":291,"xW":32.073205,"yW":34.792106,"xE":32.070341,"yE":34.801687},
{"streetName":"Daniel 14, Tel Aviv","streetAngle":291,"xW":32.068878,"yW":34.763334,"xE":32.068361,"yE":34.764893},
{"streetName":"Yona HaNavi, Tel Aviv","streetAngle":289,"xW":32.07306,"yW":34.764986,"xE":32.071942,"yE":34.769106},
{"streetName":"Nechemiah, Tel Aviv","streetAngle":289,"xW":32.069551,"yW":34.763656,"xE":32.068933,"yE":34.765641},
{"streetName":"Allenby (36), Tel Aviv","streetAngle":288,"xW":32.073642,"yW":34.765459,"xE":32.072751,"yE":34.768678},
{"streetName":"Ge'ula, Tel Aviv","streetAngle":288,"xW":32.072419,"yW":34.764728,"xE":32.071178,"yE":34.769415},
{"streetName":"HaRav Kuk, Tel Aviv","streetAngle":288,"xW":32.071819,"yW":34.76449,"xE":32.070705,"yE":34.768331},
{"streetName":"HaRav Ahronson, Tel Aviv","streetAngle":288,"xW":32.071182,"yW":34.764453,"xE":32.070573,"yE":34.766738},
{"streetName":"Zrubavel, Tel Aviv","streetAngle":288,"xW":32.070759,"yW":34.764104,"xE":32.070104,"yE":34.766464},
{"streetName":"Ezra Hasofer, Tel Aviv","streetAngle":288,"xW":32.070277,"yW":34.763948,"xE":32.069618,"yE":34.766051},
{"streetName":"Arlozorov, Tel Aviv","streetAngle":284,"xW":32.087611,"yW":34.771639,"xE":32.082707,"yE":34.794339},
{"streetName":"Yitshak Sadah, Tel Aviv","streetAngle":283,"xW":32.065837,"yW":34.784219,"xE":32.063918,"yE":34.794592},
{"streetName":"Gordon, Tel Aviv","streetAngle":282,"xW":32.08272,"yW":34.768969,"xE":32.080747,"yE":34.779741},
{"streetName":"Jabotinsky, Tel Aviv","streetAngle":282,"xW":32.089823,"yW":34.772457,"xE":32.087031,"yE":34.788264},
{"streetName":"Nordau Boulevard, Tel Aviv","streetAngle":277,"xW":32.092725,"yW":34.77355,"xE":32.091825,"yE":34.782712},
{"streetName":"Yehuda Hayamit, Tel Aviv","streetAngle":276,"xW":32.050277,"yW":34.751627,"xE":32.049612,"yE":34.758601},
{"streetName":"Frishman, Tel Aviv","streetAngle":271,"xW":32.079967,"yW":34.76748,"xE":32.079494,"yE":34.781116},
{"streetName":"Eilat, Tel Aviv","streetAngle":243,"xW":32.05689,"yW":34.759933,"xE":32.059645,"yE":34.767363
}];


  var merge = function (){
    // var a = Math.round(hengeMoment[0].azimuth)
    // var b = hengeStreet[0].streetAngle;

    for (var i = 0; i < hengeStreet.length; i++){
      for (var j=0; j < hengeMoment.length; j++){
        if (hengeStreet[i].streetAngle === Math.round(hengeMoment[j].azimuth)){
          final.push({streetMatch: hengeStreet[i], sunMatch: hengeMoment[j]});
        }
      }
    }

    addEvenetime(final);
  };

  var addEvenetime = function(final){
    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    };
    var date = "";
    var newdate = "";
    var startdate ="";
        for (var i = 0; i < final.length; i++){
          date = final[i].sunMatch.time;
          newdate = date.replace(/-|:|\./g, "");
          date = newdate.slice(0, 15) + newdate.slice(18);
          final[i].sunMatch.eventime = date;
          // crazy thing that takes the hour back by one
          var end  = date;
          var bla = Number(end.substring(10,11)) - 1;
          var start = end.replaceAt(10, bla.toString());
          final[i].sunMatch.startime = start;
      };
      console.log(final);
    };


  var getAll = function () {
    return $http.get('/streets').success(function (data) {
        angular.copy(data, hengeMoment);

        // console.log(hengeMoment);
        // console.log(hengeStreet);
    });
  };

return {
  hengeMoment: hengeMoment,
  getAll: getAll,
  hengeStreet: hengeStreet,
  merge: merge,
  final: final,
  addEvenetime: addEvenetime
};

}]);
