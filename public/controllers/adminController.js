angular.module('appRoute')
.controller('adminController',function($window,$scope,$timeout,mainService,$q,$state,$stateParams,$mdDialog,authService){
  // $scope.User = localStorage.getItem("token");
  $scope.logValBD = $stateParams.param1;
  $scope.logValLO = $stateParams.param2;
  $scope.ShowBookSeat = $stateParams.showSeat;
  $scope.HideBookSeat = $stateParams.HideBookSeat;
  $scope.showChartDiv = true;
  // $scope.disableSABtn = false;
  $scope.dbkgShow = true;
  $scope.rbkgShow = false;
  $scope.btnOpacityDB = "1";
  $scope.btnOpacityRB = ".2";
  $scope.tBar = "always";
  $scope.includeDesktopTemplate = false;
  $scope.includeMobileTemplate = false;

  var screenWidth = $window.innerWidth;

  if (screenWidth < 768){
    $scope.includeMobileTemplate = true;
    $scope.tBar = "auto";
  }else{
    $scope.includeDesktopTemplate = true;
    $scope.tBar = "always";
  }
  console.log("Screen Mobile Size:"+$scope.includeMobileTemplate);
  console.log("Screen Desktop Size:"+$scope.includeDesktopTemplate);
  var userObj = authService.getUser();
  if(userObj != undefined){
    var userName = userObj.userName;
    $scope.currentUser = userName.substring(0,1).toUpperCase()+userName.substring(1,userName.length);
    console.log("current user is" +$scope.currentUser);
    $scope.User = userObj.eMail;
  }
  mainService.getAllTheBookings().success(function(data){
    for (var i = 0; i < data.length; i++) {
      $scope.AllbookingDetails.push(data[i]);
    }
    var len = $scope.AllbookingDetails.length;
    console.log(len);
  })

  $scope.AllbookingDetails = [];
  $scope.Tower = null;
  $scope.Towers = null;
  $scope.Areas =[
    { id: 1, name: 'Fareham' },
    { id: 2, name: 'Swindon' },
    { id: 3, name: 'Cheltenham' }
  ];
  $scope.loadFloors = function() {
    return $timeout(function() {
      $scope.Floors =  $scope.Floors  || [
        { id: 1, name: 'Ground Floor' },
        { id: 2, name: '1st Floor' },
        { id: 3, name: '2nd Floor' },
        { id: 4, name: '3rd Floor' },

      ];
    }, 350);
  };
  // $scope.fetchBookings = function(location,floor){
  //   $scope.showChartDiv = true;
  //   console.log(floor);
  //   console.log(location);
  //   var date = new Date();
  //   var currHour = date.getHours();
  //   var currentMinute = date.getMinutes();
  //   // var currHour =13;
  //   // var currentMinute = 30;
  //
  //   var todayDate = date.getDate();
  //   if(todayDate <10){   todayDate = "0"+todayDate;  }
  //
  //   var mon = date.getMonth()+1;
  //   var year = date.getFullYear();
  //   if(mon<10){   mon = "0"+mon;  }
  //
  //   var currDate = year+"-"+mon+"-"+todayDate;
  //   $scope.JsonDataDesk = [['status','Seats',{role:'style'}],
  //   ['booked',0,'color:#ADC20E'],
  //   ['available',0,'color:#1B613A'],
  //   ['occupied',0,'color:#C21F0E']
  // ];
  //
  // mainService.getBookings(location,floor).success(function(response){
  //   console.log(response);
  //   for (var i = 0; i < response.length; i++) {
  //     var responseStartTime = response[i].StartTime.split(":");
  //     var responseStartTimeHour = parseInt(responseStartTime[0]);
  //     var responseStartTimeMinute = parseInt(responseStartTime[1]);
  //     var responseEndTime = response[i].EndTime.split(":");
  //     var responseEndTimeHour = responseEndTime[0];
  //     var responseEndTimeMinute = responseEndTime[1];
  //
  //     if(
  //       (  (  ( currHour == responseStartTimeHour && currentMinute >= responseStartTimeMinute) ||(currHour > responseStartTimeHour)  ) &&  (  ( currHour == responseEndTimeHour && currentMinute < responseEndTimeMinute) ||(currHour < responseEndTimeHour)  ) ) ||
  //       (  (  (  currHour == responseStartTimeHour && currentMinute < responseStartTimeMinute) || currHour < responseStartTimeHour )  &&    (  (currHour == responseEndTimeHour && currentMinute > responseEndTimeMinute) || currHour > responseEndTimeHour )  ) ){
  //
  //               $scope.JsonDataDesk[1][1] = $scope.JsonDataDesk[1][1]+1;
  //       }
  //   }
  //   var availableSeats = 100 - $scope.JsonDataDesk[1][1];
  //   $scope.JsonDataDesk[2][1] = availableSeats;
  //
  //   google.charts.load('current', {packages: ['corechart', 'bar']});
  //     google.charts.setOnLoadCallback(drawBasic);
  //     function drawBasic() {
  //       var data = google.visualization.arrayToDataTable(  $scope.JsonDataDesk);
  //
  //       var options = {
  //         hAxis: {
  //           title: 'Parking',
  //           titleTextStyle: {
  //             fontSize: 12,
  //             bold: true
  //           }
  //         },
  //         vAxis: {
  //           gridlines: {
  //             count: 5
  //           },
  //           title: 'Total Parking Slots',
  //           titleTextStyle: {
  //             fontSize: 12,
  //             bold: true
  //           },
  //           ticks: [0,10, 20, 30, 40, 50, 60,70,80,90,100]
  //         },
  //         legend: { position: "none" }
  //       };
  //       if(location == 'Electronic City'){
  //         var divId = "chart_divDesk";
  //       }
  //       else{
  //           var divId = "chart_divDesk"+location;
  //       }
  //       var chart = new google.visualization.ColumnChart(
  //         document.getElementById(divId));
  //
  //         chart.draw(data,options);
  //       }
  // })
  //   }
  var loc = "";
  $scope.fetchBookings = function(location){
      loc = location;
      console.log("Assigning location : "+loc);
      $scope.showChartDiv = true;
      console.log(location);
      var date = new Date();
      var currHour = date.getHours();
      var currentMinute = date.getMinutes();

      var todayDate = date.getDate();
      if(todayDate <10){   todayDate = "0"+todayDate;  }

      var mon = date.getMonth()+1;
      var year = date.getFullYear();
      if(mon<10){   mon = "0"+mon;  }

      var currDate = year+"-"+mon+"-"+todayDate;
      $scope.JsonDataDesk = [['Parking Location', 'Available Slots', 'Occupied Slots', 'Booked Slots'],
          ['Ground Floor', 100, 0, 0],
          ['1st Floor', 100, 0, 0],
          ['2nd Floor', 100, 0, 0],
          ['3rd Floor', 100, 0, 0]
    ];

    mainService.getLocationBooking(location,currDate).success(function(response){
        for (var i = 0; i < response.length; i++) {
          var responseStartTime = response[i].StartTime.split(":");
             var responseStartTimeHour = parseInt(responseStartTime[0]);
             var responseStartTimeMinute = parseInt(responseStartTime[1]);
             var responseEndTime = response[i].EndTime.split(":");
             var responseEndTimeHour = responseEndTime[0];
             var responseEndTimeMinute = responseEndTime[1];
             if(
                   (  (  ( currHour == responseStartTimeHour && currentMinute >= responseStartTimeMinute) ||(currHour > responseStartTimeHour)  ) &&  (  ( currHour == responseEndTimeHour && currentMinute < responseEndTimeMinute) ||(currHour < responseEndTimeHour)  ) ) ||
                   (  (  (  currHour == responseStartTimeHour && currentMinute < responseStartTimeMinute) || currHour < responseStartTimeHour )  &&    (  (currHour == responseEndTimeHour && currentMinute > responseEndTimeMinute) || currHour > responseEndTimeHour )  ) ){

                          //  $scope.JsonDataDesk[1][1] = $scope.JsonDataDesk[1][1]+1;
                          for (var j = 1; j < $scope.JsonDataDesk.length; j++) {
                            if($scope.JsonDataDesk[j][0] == response[i].Floor){
                              $scope.JsonDataDesk[j][3] = $scope.JsonDataDesk[j][3]+1;
                              $scope.JsonDataDesk[j][1] = $scope.JsonDataDesk[j][1]-1;
                              console.log("incrementing the booked seats : "+$scope.JsonDataDesk[j][3]);
                              console.log("decrementing the vailable  seats : "+$scope.JsonDataDesk[j][1]);
                            }
                          }
                   }
        }
          console.log($scope.JsonDataDesk);
          // var divId = "";
          // console.log(loc+"--------------"+divId);
          // if(location == 'Electronic City'){
          //   divId = 'columnchart_material'+'Electronic_city';
          // }
          // else{
          //   divId = 'columnchart_material'+loc;
          // }
          var parkingData = $scope.JsonDataDesk;
          google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBasic);
     function drawBasic() {
       var data = google.visualization.arrayToDataTable(parkingData);

       var options = {
         width:800,
         height:360,
         hAxis: {
           title: 'Parking Locations',
           titleTextStyle: {
             fontSize: 12,
             bold: true
           }
         },
         vAxis: {
           gridlines: {
             count: 5
           },
           title: 'Parking Slots',
           titleTextStyle: {
             fontSize: 12,
             bold: true
           },
           ticks: [0, 10, 20, 30, 40, 50,60,70,80,90,100]
         },
         legend: { position: "top" }
       };
          if(loc == "Electronic City"){
            var chart = new google.visualization.ColumnChart(document.getElementById("chartEC"));
            chart.draw(data, options);
          }else if(loc == "Sarjapur"){
            var chart = new google.visualization.ColumnChart(document.getElementById("chartSJP"));
            chart.draw(data, options);
          }else if(loc == "Koramangala"){
            var chart = new google.visualization.ColumnChart(document.getElementById("chartKMGL"));
            chart.draw(data, options);
          }else if(loc == "Whitefield"){
            var chart = new google.visualization.ColumnChart(document.getElementById("chartWTFD"));
            chart.draw(data, options);
          }else{
            var chart = new google.visualization.ColumnChart(document.getElementById("chartEC"));
            chart.draw(data, options);
          }

        }
   })
  }
})
