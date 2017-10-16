(function () {
    var app = angular.module('myController', []);
    //                            //|                              ,| 
    //                           //,/                             -~ |
    //                         // / |                         _-~   /  , 
    //                       /'/ / /                       _-~   _/_-~ | 
    //                      ( ( / /'                   _ -~     _-~ ,/' 
    //                       \~\/'/|             __--~~__--\ _-~  _/, 
    //               ,,)))))));, \/~-_     __--~~  --~~  __/~  _-~ / 
    //            __))))))))))))));,>/\   /        __--~~  \-~~ _-~ 
    //           -\(((((''''(((((((( >~\/     --~~   __--~' _-~ ~| 
    // --==//////((''  .     `)))))), /     ___---~~  ~~\~~__--~ 
    //          ))| @    ;-.     (((((/           __--~~~'~~/ 
    //          ( `|    /  )      )))/      ~~~~~__\__---~~__--~~--_ 
    //            |   |   |       (/      ---~~~/__-----~~  ,;::'  \         , 
    //             o_);   ;        /      ----~~/           \,-~~~\  |       /| 
    //                   ;        (      ---~~/        z `:::|      |;|      < > 
    //                  |   _      `----~~~~'      /      `:|       \;\_____// 
    //            ______/\/~    |                 /        /         ~------~ 
    //          /~;;.____/;;'  /          ___----(   `;;;/ 
    //         / //  _;______;'------~~~~~    |;;/\    / 
    //       //  | |                        /  |  \;;,\ 
    //       (<_  | ;                      /',/-----'  _> 
    //        \_| ||_                     //~;~~~~~~~~~ 
    //            `\_|                   (,~~ 

    app.controller('MainController', ['localStorageService', '$filter', '$rootScope', 'languageService', 'foodService', '$scope', 'ReportService', 'uuid', function (localStorageService, $filter, $rootScope, languageService, foodService, $scope, ReportService, uuid) {
        var vm = this;
        $rootScope.data = {};
        //foodService.getList();
        //Count http status 200
        //取API
        //online or offline
        console.log("online", navigator.onLine);
        foodService.getList().then(function (response) {
            console.log('hi');
            $rootScope.data.menuList = response.data;
            localStorageService.setProperty("menuList", $rootScope.data.menuList);
            vm.menuLocal = localStorageService.getProperty("menuList");
            //console.log("menuLocal", vm.menuLocal);
            $rootScope.data.status = response.status;
        }).catch(function (response) {
            console.log('nope', response.status);
            $rootScope.data.menuList = localStorageService.getProperty('menuList');
            $rootScope.data.status = response.status;
        });

        ReportService.getdata(0).then(function (response) {
            $rootScope.data.reportList = response;
        });
        ReportService.getchartdata("w").then(function (response) {
            $rootScope.data.chartList = response;
        });
        foodService.gettypeList().success(function (data) {
            $rootScope.data.typeList = data;
        });
        //count !=200 >3
        //console.log('status', $rootScope.data.status);
        //vm.menuLocal = $rootScope.data.menuList;
        //localStorageService.setProperty("menuList", $rootScope.data.menuLocal);
        //console.log('menuList', $rootScope.data.menuList);
        //$rootScope.data.menuLocal = localStorageService.getProperty("menuList")|| [];
        //console.log('menuLocal', $rootScope.data.menuLocal);

        $rootScope.data.checkList = localStorageService.getProperty("checkList") || [];
        $rootScope.data.offline = localStorageService.getProperty("offlineCheckList");
        $rootScope.data.orderList = { data: [], spicy: 0, pay: 0, phone: 0, discount: 0 };
        $rootScope.data.checkId = localStorageService.getProperty("checkId") || 0;
        $rootScope.data.offlineCount = localStorageService.getProperty("offlineCount") || 0;
        //console.log('mainCid', $rootScope.data.checkId);
        $rootScope.data.language = localStorageService.getProperty("language") || 'tw';
        $rootScope.swal = swal;
        $rootScope.data.pay = 0;
        //vm.hash = uuid.v4();
        //console.log('uuid',vm.hash);
        vm.isOrder = true;
        vm.isCheck = false;
        vm.isOption = false;
        vm.isPurchase = false;
        vm.isPerson = false;
        vm.isChart = false;
        vm.isExpend = false;

        $scope.setTab = function (index) {
            switch (index) {
                case 1:
                    vm.isOrder = true;
                    vm.isCheck = false;
                    vm.isOption = false;
                    vm.isPurchase = false;
                    vm.isPerson = false;
                    vm.isChart = false;
                    vm.isExpend = false;
                    break;
                case 2:
                    vm.isOrder = false;
                    vm.isCheck = true;
                    vm.isOption = false;
                    vm.isPurchase = false;
                    vm.isPerson = false;
                    vm.isChart = false;
                    vm.isExpend = false;
                    break;
                case 3:
                    vm.isOrder = false;
                    vm.isCheck = false;
                    vm.isOption = true;
                    vm.isPurchase = false;
                    vm.isPerson = false;
                    vm.isChart = false;
                    vm.isExpend = false;
                    break;
                case 4:
                    vm.isOrder = false;
                    vm.isCheck = false;
                    vm.isOption = false;
                    vm.isPurchase = true;
                    vm.isPerson = false;
                    vm.isChart = false
                    vm.isExpend = false;
                    break;
                case 5:
                    vm.isOrder = false;
                    vm.isCheck = false;
                    vm.isOption = false;
                    vm.isPurchase = false;
                    vm.isPerson = true;
                    vm.isChart = false;
                    vm.isExpend = false;
                    break;
                case 6:
                    vm.isOrder = false;
                    vm.isCheck = false;
                    vm.isOption = false;
                    vm.isPurchase = false;
                    vm.isPerson = false;
                    vm.isChart = true;
                    vm.isExpend = false;
                    break;
                case 7:
                    vm.isOrder = false;
                    vm.isCheck = false;
                    vm.isOption = false;
                    vm.isPurchase = false;
                    vm.isPerson = false;
                    vm.isChart = false;
                    vm.isExpend = true;
                    break;
            }
        };
        $rootScope.data.setTab = vm.setTab;
        vm.discount = 0;

        $scope.totalCount = function (list) {
            var total = 0;
            //console.log('List', list);
            angular.forEach(list, function (value, key) {
                total += value.price * value.count;
            });
            return total;
        };

        vm.numberCount = function (list) {
            var total = 0;
            angular.forEach(list, function (value, key) {
                total += value.count;
            });
            return total;
        };

        vm.changeLanguage = function (lan) {
            localStorageService.setProperty("language", lan);
            $rootScope.data.language = localStorageService.getProperty("language") || 'tw';
        };

        vm.getLanguageName = function () {
            return languageService.getLanguageName($rootScope.data.language);
        };
    }]);
    app.controller('OrderController', ['localStorageService', '$filter', '$rootScope', '$timeout', 'foodService', 'posService', '$scope', 'PrintService', 'uuid', function (localStorageService, $filter, $rootScope, $timeout, foodService, posService, $scope, PrintService, uuid) {
        var vm = this;
        vm.offline = $rootScope.data.offline;
        vm.offlineCount = $rootScope.data.offlineCount;
        posService.getPos2Status().then(function (response) {
            vm.pos2Status = response.status;
            //console.log('pos2', vm.pos2Status);
            //console.log('pos22', vm.pos2Status);
            //console.log('lenfth', vm.offline.length);
            if (vm.pos2Status == 200 && vm.offline.length > 0 && navigator.onLine == true) {
                //$timeout(function () {
                posService.postOffline(JSON.stringify(vm.offline)).then(vm.offlineCount = 0);
                // },1);
                //vm.offline = [];
                //vm.offlineCount = 0;
                $timeout(function () {
                    vm.offline = [];
                    vm.offlineCount = 0;
                    localStorageService.setProperty("offlineCheckList", vm.offline);
                    localStorageService.setProperty("offlineCount", vm.offlineCount);
                }, 1);
            }

        });
        //console.log("size", vm.offline.length);
        //$timeout(function () {

        //}, 1);
        vm.menuList = $rootScope.data.menuList;
        //vm.menuLocal = localStorageService.getProperty("menuList") || [];
        //console.log('menuLocal', vm.menuLocal);
        //console.log('OrderMenuList', vm.menuList);
        //vm.menuList = $filter('orderBy')(vm.menuList, 'id');
        vm.checkList = $rootScope.data.checkList;
        //vm.checkList = $filter('orderBy')(vm.checkList , 'id');
        vm.checkId = $rootScope.data.checkId;
        //console.log('List',vm.checkList);
        //console.log('id',vm.checkId);
        vm.orderList = $rootScope.data.orderList;
        //console.log('進入點餐', vm.orderList);
        //if(vm.orderList.data)
        //console.log('order.orderList', vm.orderList);
        //vm.orderList.pay = 0;
        //vm.orderList.discount = 0;
        vm.plus = function (item) {
            var copy = angular.copy(item);
            var target = {};
            angular.forEach(vm.orderList.data, function (value, key) {
                if (value.id == item.id) {
                    target = value;
                }
            });
            if (target.id > 0) {
                target.count++;
            }
            else {
                copy.count = 1;
                vm.orderList.data.push(copy);
            }
            if (vm.orderList.discount == 95) { vm.NintyFive(); }
            if (vm.orderList.discount == 90) { vm.Ninty(); }
        };
        //$scope.payCount = $rootScope.data.pay;
        vm.minus = function (item) {
            var copy = angular.copy(item);
            var target = {};
            angular.forEach(vm.orderList.data, function (value, key) {
                if (value.id == item.id) {
                    target = value;
                }
            });
            if (target.id > 0) {
                target.count--;
                if (target.count == 0) {
                    vm.orderList.data.splice(vm.orderList.data.indexOf(target), 1);
                }
            }
            if (vm.orderList.discount == 95) { vm.NintyFive(); }
            if (vm.orderList.discount == 90) { vm.Ninty(); }
        };
        vm.count = function (item) {
            var size = 0
            angular.forEach(vm.orderList.data, function (value, key) {
                if (value.id == item.id) {
                    size = value.count;
                }
            });
            return size;
        };
        vm.submit = function () {
            if (vm.orderList.data.length > 0) {
                $rootScope.swal({
                    title: "已輸入完成?",
                    text: "菜單將會轉到結帳區",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "點菜完成",
                    closeOnConfirm: false
                }, function () {
                    vm.submitSuccess();
                    swal("完成!", "菜單已經轉到結帳區", "success");
                    //$scope.payCount=0;
                });
            } else {
                swal("錯誤!", "尚未選擇商品", "error");
            }
        };

        vm.submitSuccess = function () {
            $timeout(function () {
                //vm.orderList.pay = $rootScope.data.pay;
                var copy = angular.copy(vm.orderList);
                //console.log('點餐完成，傳送前', vm.orderList);
                if (copy.id) {
                    angular.forEach(vm.checkList, function (value, key) {
                        if (value.id === copy.id)
                            vm.orderList[key] = copy;
                    });
                    copy.uuid = uuid.v4();
                    copy.createTime = new Date();
                    copy.total = $scope.totalCount(copy.data) - copy.pay;
                    //console.log('copy', copy);
                    PrintService.postPrint(copy);
                    //console.log('copy', copy);
                    $rootScope.data.orderList = copy;
                    //console.log('傳送後', $rootScope.data.orderList);
                    localStorageService.setProperty("checkList", vm.checkList);
                } else {
                    //if (copy.phone == 1) {
                    //    copy.id = new Date();
                    //} else {
                    var id = $rootScope.data.checkId;
                    if (vm.checkList.length) {
                        id = vm.checkList[vm.checkList.length - 1]["id"];
                    }
                    id++;
                    if (id > 150) {
                        id = 1;
                    }
                    copy.id = id;
                    vm.checkId = id;
                    $rootScope.data.checkId = vm.checkId;
                    localStorageService.setProperty("checkId", vm.checkId);
                    //}
                    copy.uuid = uuid.v4();
                    copy.createTime = new Date();
                    copy.total = $scope.totalCount(copy.data) - copy.pay;
                    console.log('copy', copy);
                    vm.checkList.push(copy);
                    localStorageService.setProperty("checkList", vm.checkList);
                    //console.log('checkList', vm.checkList);
                    PrintService.postPrint(copy);
                    //console.log('copy', copy);
                }
                vm.orderList = { data: [], spicy: 0, pay: 0, phone: 0, discount: 0 };
                //console.log('OD', vm.ordeist);
                $rootScope.data.orderList = vm.orderList;
            }, 1);
        };

        vm.clear = function () {
            vm.orderList = { data: [], spicy: 0, pay: 0, phone: 0, discount: 0 };
            $rootScope.data.orderList = vm.orderList;
        };
        vm.NintyFive = function () {
            //console.log('orgPrice', $scope.totalCount(vm.orderList.data));
            vm.orderList.discount = 95;
            vm.NintyFiveCount = $scope.totalCount(vm.orderList.data) * 0.95;
            //console.log('95', vm.NintyFiveCount);
            vm.disCount = vm.NintyFiveCount % 5;
            if (vm.disCount == 0) {
                vm.ForFive = 0;
            }
            else {
                vm.ForFive = 5 - vm.disCount;
            }
            vm.returnNintyFive = vm.NintyFiveCount + vm.ForFive;
            vm.orderList.pay = $scope.totalCount(vm.orderList.data) - vm.returnNintyFive;
            $rootScope.data.pay = vm.orderList.pay;
            $rootScope.data.discount = vm.orderList.discount;
            //$scope.payCount = $scope.totalCount(vm.orderList.data) - vm.returnNintyFive;
        };
        vm.Ninty = function () {
            //console.log('orgPrice', $scope.totalCount(vm.orderList.data));
            vm.orderList.discount = 90;
            $rootScope.data.discount = vm.orderList.discount;
            vm.NintyCount = $scope.totalCount(vm.orderList.data) * 0.9;
            //console.log('95', vm.NintyFiveCount);
            vm.disCount = vm.NintyCount % 5;
            if (vm.disCount == 0) {
                vm.ForFive = 0;
            }
            else {
                vm.ForFive = 5 - vm.disCount;
            }
            vm.returnNinty = vm.NintyCount + vm.ForFive;
            vm.orderList.pay = $scope.totalCount(vm.orderList.data) - vm.returnNinty;
            $rootScope.data.pay = vm.orderList.pay;
            //$scope.payCount = $scope.totalCount(vm.orderList.data) - vm.returnNintyFive;
        };
        vm.Origin = function () {
            vm.orderList.pay = 0;
            $rootScope.data.pay = vm.orderList.pay;
            vm.orderList.discount = 0;
            $rootScope.data.discount = vm.orderList.discount;
        };
        vm.KouWuYen = function () {
            vm.orderList.pay += 5;
            $rootScope.data.pay = vm.orderList.pay;
        };
        vm.JiaWuYen = function () {
            vm.orderList.pay -= 5;
            $rootScope.data.pay = vm.orderList.pay;
        };
        vm.newId = function (id) {
            if (!id) {
                if (vm.checkId + 1 > 150) {
                    return 1;
                }
                else
                    return vm.checkId + 1;
            }
        }
    }]);
    app.controller('CheckController', ['localStorageService', '$filter', '$rootScope', '$timeout', 'posService', '$scope', 'uuid', function (localStorageService, $filter, $rootScope, $timeout, posService, $scope, uuid) {
        var vm = this;
        vm.orderList = $rootScope.data.orderList;
        //console.log('order1', vm.orderList);
        vm.checkList = $rootScope.data.checkList;
        //console.log('check', vm.checkList);
        vm.edit = function (list) {
            $rootScope.data.orderList = list;
            $scope.setTab(1);
            //console.log('order2', $rootScope.data.orderList);
        };
        vm.oneKeyAllDie = function () {
            swal({
                title: "你真的要一鍵掃除嗎?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "完成",
                closeOnConfirm: false
            }, function () {
                //swal("完成!", "一鍵清除成功" , "success");
                vm.AllDie();
            }
            );
        }

        vm.AllDie = function () {
            posService.getPos2Status().then(function (response) {
                vm.pos2Status = response.status;
                //console.log('pos2', vm.pos2Status);
                //console.log('pos22', vm.pos2Status);
                //console.log('lenfth', vm.offline.length);
                if (vm.checkList.length > 1) {
                    if (vm.pos2Status == 200 && navigator.onLine == true) {
                        //$timeout(function () {
                        console.log('pos2', vm.pos2Status);
                        posService.postOffline(JSON.stringify(vm.checkList));
                        console.log('Json.Stringify', JSON.stringify(vm.checkList));
                        console.log('alldie', vm.checkList);
                        // },1);
                        //vm.offline = [];
                        //vm.offlineCount = 0;
                        $timeout(function () {
                            vm.checkList = [];
                            localStorageService.setProperty("checkList", vm.checkList);
                            swal(
                            {
                                title: "完成！",
                                text: "一鍵掃除成功！",
                                type: "success"
                            }
                            , function () {
                                $timeout(function () {
                                    location.reload();
                                }, 100);
                            }
                            );

                            //localStorageService.setProperty("offlineCount", vm.offlineCount);
                        }, 1);
                    }
                    else {
                        swal("失敗!", "一鍵清除失敗，請找優良團隊成員", "error");
                    }
                } else if (vm.checkList.length < 1) {
                    swal("沒有單號不要按我好嗎QQ", "error");
                } else {
                    swal("只有一單就按那一單啦", "就一單而已捏", "error");
                }
            });
        }

        vm.submit = function (item) {
            $rootScope.swal({
                title: "已交貨?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "完成",
                closeOnConfirm: false
            }, function () {
                vm.submitSuccess(item);
                swal("完成!", "已交貨：結帳單 " + item.id + "", "success");
            });
        }

        vm.submitSuccess = function (item) {
            $timeout(function () {
                posService.getPosStatus().then(function (response) {
                    vm.posStatus = response.status;
                    console.log('pos', vm.posStatus);
                    //console.log('pos1', vm.posStatus);
                    //vm.offlineCount = $rootScope.data.offlineCount;
                    angular.forEach(vm.checkList, function (value, key) {
                        if (value.id == item.id) {
                            //value.createTime = new Date();                       //新增時間
                            //value.uuid = uuid.v4();
                            console.log(value);
                            posService.postPos(value);
                            //if200清除checkList else localStorage
                            if (vm.posStatus == 200 && navigator.onLine == true) {
                                console.log('online', navigator.onLine);
                                console.log("status", $rootScope.data.status);
                                vm.checkList.splice(key, 1);
                                localStorageService.setProperty("checkList", vm.checkList);
                            }
                            else {
                                vm.checkList.splice(key, 1);
                                localStorageService.setProperty("checkList", vm.checkList);
                                vm.offlineCheck = localStorageService.getProperty("offlineCheckList");
                                console.log("offC1", vm.offlineCheck);
                                //value.createTime = new Date();                       //新增時間
                                //value.uuid = uuid.v4();
                                vm.offlineCheck.push(value);
                                vm.offlineCount += 1;
                                console.log("Json", value);
                                console.log("offC2", vm.offlineCheck);
                                console.log("offCount", vm.offlineCount);
                                localStorageService.setProperty("offlineCheckList", vm.offlineCheck);
                                localStorageService.setProperty("offlineCount", vm.offlineCount);
                                //console.log("status", $rootScope.data.status);
                                //console.log("Check", value);
                                //console.log("Check", item);
                            }
                        }
                    });
                }).catch(function (response) {
                    angular.forEach(vm.checkList, function (value, key) {
                        if (value.id == item.id) {
                            console.log(value);
                            posService.postPos(value);
                            //if200清除checkList else localStorage
                            if (vm.posStatus == 200 && navigator.onLine == true) {
                                console.log('online', navigator.onLine);
                                console.log("status", $rootScope.data.status);
                                vm.checkList.splice(key, 1);
                            }
                            else {
                                vm.checkList.splice(key, 1);
                                vm.offlineCheck = localStorageService.getProperty("offlineCheckList");
                                console.log("offC1", vm.offlineCheck);
                                vm.offlineCheck.push(value);
                                vm.offlineCount += 1;
                                console.log("Json", value);
                                console.log("offC2", vm.offlineCheck);
                                //console.log("offCount", vm.offlineCount);
                                localStorageService.setProperty("offlineCheckList", vm.offlineCheck);
                                localStorageService.setProperty("offlineCount", vm.offlineCount);
                                //console.log("status", $rootScope.data.status);
                                //console.log("Check", value);
                                //console.log("Check", item);
                            }
                        }
                    });
                })
                ;

                localStorageService.setProperty("checkList", vm.checkList);
            }, 1);
        };

        vm.reId = function () {
            $rootScope.swal({
                title: "單號強制重算?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "確定",
                closeOnConfirm: false
            }, function () {
                vm.reIdSuccess();
                swal("完成!", "單號已從頭開始計算", "success");
            });
        };

        vm.reIdSuccess = function () {
            $timeout(function () {
                $rootScope.data.checkId = 0;
                localStorageService.setProperty("checkId", $rootScope.data.checkId);
            }, 1);
        };
    }]);
    app.controller('PurchaseController', ['$filter', '$rootScope', '$scope', 'PurChaseService', 'RawService', 'localStorageService', 'uuid', function ($filter, $rootScope, $scope, PurChaseService, RawService, localStorageService, uuid) {
        var vm = this;
        PurChaseService.getPurList().then(function (response1) {
            RawService.getRawList().then(function (response2) {

                vm.PurStatus = response1.status;

                vm.RawStatus = response2.status;
                if (navigator.onLine) {
                    if (vm.PurStatus == 200 && vm.RawStatus == 200) {
                        vm.update = function (a) {
                            vm.item = a;
                            vm.purItems = a.data;
                            vm.item.createTime = a.createtime;
                            vm.item.data = {};
                            console.log('data', vm.item);
                        };
                        vm.seeupdate = function (a) {

                            //if (Object.keys(vm.item.data.name).length <= 0)
                            if (vm.item.data.name == null) {

                                vm.item.data = a;
                                angular.forEach(vm.purItems, function (value, key) {
                                    if (value.id == vm.item.data.id) {
                                        vm.purItems.splice(key, 1);
                                    }
                                })

                            }
                            else {

                                if (vm.itemPlus(vm.item.data)) {
                                    vm.item.data = a;
                                    angular.forEach(vm.purItems, function (value, key) {
                                        if (value.id == vm.item.data.id) {
                                            vm.purItems.splice(key, 1);
                                        }
                                    })
                                }

                            }
                        };

                        vm.showDetail = function (a) {
                            $("." + a).fadeToggle();
                        };
                        vm.Detailnum = 0;
                        vm.PurList = response1.data;
                        console.log(vm.PurList);
                        vm.RawList = response2.data;
                        vm.RawList2 = [];
                        angular.forEach(vm.RawList, function (value, key) {
                            if (value.IsDelete != true) {
                                vm.RawList2.push(value);
                            }
                        })
                        vm.PageSize = 10;
                        vm.PurCurPage = 0;
                        vm.RawCurPage = 0;
                        vm.item = {};
                        vm.item.createTime = new Date($.datepicker.formatDate('yy-mm-dd', new Date()));
                        $("#Eday").datepicker({
                            showOtherMonths: true,
                            dateFormat: "yy-mm-dd",
                            maxDate: new Date(),
                            onSelect: function (Eday) {
                                vm.item.createTime = Eday;
                            }
                        });
                        vm.Raw = {};
                        vm.use = {};
                        vm.datacount = 0;
                        for (var i = 0; i < vm.PurList.length; i++) {
                            vm.datacount = vm.datacount + vm.PurList[i].data.length;
                        }

                        vm.purItems = [];
                        vm.useItems = [];
                        vm.PurMaxPage = Math.ceil(vm.datacount / vm.PageSize) - 1
                        vm.RawMaxPage = Math.ceil(vm.RawList.length / vm.PageSize) - 1
                        //vm.item.data.name = '';
                        //vm.item.data.price = '';
                        //vm.item.data.pqrt = '';

                        vm.FindUnit = function (name) {
                            angular.forEach(vm.RawList, function (value, key) {
                                if (value.Name === name)
                                    vm.Unit = value.Unit;
                            });
                        }
                        vm.FindName = function (id) {
                            angular.forEach(vm.RawList, function (value, key) {
                                if (value.NameId === id)
                                    return value.Name;
                            });
                        }
                        vm.itemPlus = function (data) {
                            console.log('data', vm.purItems);
                            if (data) {
                                if (data.name && data.price && data.pqrt)
                                    //if(data.name)
                                {
                                    if (data.mark) {
                                        vm.purItems.push(data);
                                        console.log('123', vm.purItems);
                                        //return true;
                                    }
                                    else {
                                        data.mark = 'nope';
                                        vm.purItems.push(data);
                                        console.log('123', vm.purItems);
                                        //return true;
                                    }
                                    //localStorageService.setProperty("purItem", vm.purItems);
                                    vm.item.data = {};
                                    //console.log('itemData', vm.purItems);
                                    //console.log('afterItem', vm.item.data);
                                    //vm.purItemList = localStorageService.getProperty("purItem");
                                }
                                else {
                                    swal("細項有空格", "請確認品項，金額，數量都有填寫", "error");
                                    return false;
                                }
                            }
                            else {
                                swal("細項有空格", "請確認品項，金額，數量都有填寫", "error");
                                return false;
                            }
                        }

                        vm.PurPost = function (data) {
                            //判定廠商及電話有無資料再往下
                            //console.log('data', vm.item.data);
                            if (vm.item.data) {                         //判斷有無資料
                                //console.log('dataL', Object.keys(vm.item.data).length);
                                //console.log('name', vm.item.data.name);
                                if (vm.item.data.name || vm.item.data.price || vm.item.data.pqrt) {            //判定內容有沒有東西
                                    console.log('GoPurItems');
                                    vm.itemPlus(vm.item.data);
                                    vm.item.createTime = new Date();
                                    if (vm.item.uuid) { }//判定為修改或新增 新增才另外給
                                    else { vm.item.uuid = uuid.v4(); }
                                    if (vm.item.firm) { }      //判定廠商備註 給nope
                                    else { vm.item.firm = 'nope'; }
                                    if (vm.item.phone) { }      //判定廠商備註 給nope
                                    else { vm.item.phone = 'nope'; }
                                    if (vm.item.mark) { }      //判定廠商備註 給nope
                                    else { vm.item.mark = 'nope'; }
                                    vm.item.data = vm.purItems;
                                    console.log('purchase', vm.item);
                                    PurChaseService.postPurchase(vm.item);
                                    vm.purItems = [];
                                    vm.item = {};
                                    swal("進貨完成", "恭喜你進貨完成", "success");
                                }
                                else {
                                    if (vm.purItems.length > 0) {  //判定有沒有進貨細項
                                        //console.log('Post');
                                        if (vm.item.firm) { }      //判定廠商備註 給nope
                                        else { vm.item.firm = 'nope'; }
                                        if (vm.item.phone) { }      //判定廠商備註 給nope
                                        else { vm.item.phone = 'nope'; }
                                        if (vm.item.mark) { }      //判定廠商備註 給nope
                                        else { vm.item.mark = 'nope'; }
                                        vm.item.data = vm.purItems;
                                        vm.item.createTime = new Date();
                                        if (vm.item.uuid) { }//判定為修改或新增 新增才另外給
                                        else { vm.item.uuid = uuid.v4(); }
                                        console.log('purchase', vm.item);
                                        PurChaseService.postPurchase(vm.item);
                                        vm.purItems = [];
                                        vm.item = {};
                                        swal("進貨完成", "恭喜你進貨完成", "success");
                                    }
                                    else {
                                        swal("沒有進貨細項2", "請確認細項有填寫", "error");
                                    }
                                }
                            }
                            else { swal("沒有進貨細項1", "請確認細項有填寫", "error"); }
                            //console.log('purL', vm.purItems.length);
                        };
                        vm.PurUpdate = function (item) {
                            //console.log(item);
                            $('.pur').fadeIn();
                            var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                            $body.animate({ scrollTop: 0 }, 300);
                            $('html, body').scrollTop(0);
                            vm.item = item;
                        };
                        vm.PurShow = function () {
                            //console.log(87);
                            vm.item.data = {};
                            $('.pur').fadeToggle();
                        };
                        vm.UseShow = function () {
                            $('.use').fadeToggle();
                        };
                        $scope.RType = [
                            {
                                id: '1',
                                Name: '肉'
                            },
                            {
                                id: '2',
                                Name: '菜'
                            },
                            {
                                id: '3',
                                Name: '加工'
                            },
                            {
                                id: '4',
                                Name: '消耗'
                            }
                        ];

                        vm.RawUpdate = function (Raw) {
                            //console.log(item);
                            if (Raw.IsDelete == true) {
                                swal("無法修改", "他已經被刪除了", "error");
                            }
                            else {
                                $('.raw').fadeIn();
                                var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                                $body.animate({ scrollTop: 0 }, 300);
                                $('html, body').scrollTop(0);
                                vm.Raw = Raw;
                                console.log(vm.Raw);
                            }
                        };
                        vm.RawPost = function () {
                            var copy = angular.copy(vm.Raw);
                            //console.log()
                            if (vm.Raw.Name && vm.Raw.RType && vm.Raw.Unit) {
                                RawService.postRaw(vm.Raw);
                                console.log("Raw", vm.Raw);
                            }
                            else { swal("輸入不完整", "輸入失敗", "error"); }
                            //if (vm.Raw.NameId) {
                            //    angular.forEach(vm.RawList, function (value, key) {
                            //        if (value.id === copy.id)
                            //            vm.RawList[key] = copy;
                            //    });
                            //} else {
                            //    var NameId = 1;
                            //    if (vm.RawList.length) {
                            //        NameId = vm.RawList[vm.RawList.length - 1]["NameId"] * 1 + 1;
                            //    }
                            //    copy.NameId = NameId;
                            //    vm.RawList.push(copy);
                            //}
                            //vm.isList = true;
                            //vm.Raw = {};
                        };
                        vm.usePlus = function (use) {
                            //console.log('data', data);
                            if (vm.use) {
                                if (vm.use.name && vm.use.pqrt)
                                    //if(data.name)
                                {
                                    vm.use.unit = vm.Unit;
                                    vm.useItems.push(vm.use);
                                    vm.use = {};
                                    vm.checkPost = 1;
                                    console.log('itemData', vm.useItems);
                                    console.log('useItem', vm.use);
                                }
                                else {
                                    swal("有空格", "請確認品項、數量都有填寫", "error");
                                    vm.checkPost = 0;
                                }
                            }
                            else {
                                swal("細項有空格", "請確認品項、數量都有填寫", "error");
                                vm.checkPost = 0;
                            }
                        }
                        vm.UsePost = function (use) {
                            //var copy = angular.copy(vm.use);
                            //console.log()
                            //if (vm.use) {
                            console.log('vm.use', vm.use);
                            console.log('vm.use.data', vm.use.data);
                            console.log('key', Object.keys(vm.use).length);
                            if (Object.keys(vm.use).length > 0) {
                                console.log(1);
                                if (vm.use.name || vm.use.pqrt) {
                                    console.log(2);
                                    vm.usePlus();
                                    if (vm.checkPost == 1) {
                                        angular.forEach(vm.useItems, function (value, key) {
                                            value.pqrt *= -1;
                                        });
                                        vm.use.uuid = uuid.v4();
                                        vm.use.createTime = new Date();
                                        vm.use.data = vm.useItems;
                                        RawService.minusPqrt(vm.use).then(
                                            swal(
                                        {
                                            title: "完成",
                                            text: "本日消耗成功。",
                                            type: "success"
                                        }, function () {
                                            location.reload();
                                        }));
                                    }
                                }
                                else {
                                    angular.forEach(vm.useItems, function (value, key) {
                                        value.pqrt *= -1;
                                    });
                                    vm.use.uuid = uuid.v4();
                                    vm.use.createTime = new Date();
                                    vm.use.data = vm.useItems;
                                    RawService.minusPqrt(vm.use).then(
                                        swal(
                                    {
                                        title: "完成",
                                        text: "本日消耗成功。",
                                        type: "success"
                                    }, function () {
                                        location.reload();
                                    }));
                                }
                            }

                            else { swal("沒有填消耗", "請確認消耗有填寫", "error"); }
                        };
                        vm.RawDelete = function (Raw) {
                            if (Raw.IsDelete == true) {
                                swal("無法刪除", "你已經刪過一次了", "error");
                            }
                            else {
                                swal({
                                    title: "你真的要刪除嗎?",
                                    text: "",
                                    type: "warning",
                                    showCancelButton: true,
                                    confirmButtonClass: "btn-danger",
                                    confirmButtonText: "真的真的",
                                    closeOnConfirm: false
                                }, function () {
                                    RawService.RawDelete(Raw.NameId);
                                });
                            }
                        }
                        vm.RawShow = function () {
                            //console.log(87);
                            $('.raw').fadeToggle();
                        };
                    }
                    else {
                        console.log("PurStatus", vm.PurStatus);
                        swal("伺服器失去回應", "請聯繫工程師", "success");
                        $scope.setTab(1);
                    }
                }
                else {
                    console.log("PurStatus2", vm.PurStatus);
                    swal("失去連線", "請檢察您的網路", "error");
                    $scope.setTab(1);
                }
            })
        }).catch(function (response1) {
            console.log("PurStatus3", vm.PurStatus);
            swal("失去連線", "請檢察您的網路", "error");
            $scope.setTab(1);
        });
    }]);
    app.controller('PersonController', ['$filter', '$rootScope', '$scope', 'ShiftService', 'PersonService', '$timeout', 'uuid', 'TimeCountService', function ($filter, $rootScope, $scope, ShiftService, PersonService, $timeout, uuid, TimeCountService) {
        var vm = this;

        PersonService.getPersonList().then(function (response1) {
            TimeCountService.getCountList().then(function (response2) {
                PersonService.getfirePersonList().then(function (response0) {
                    vm.fire = response0.data;

                });
                vm.mem = {};
                vm.mem.IsDelete = 0;
                vm.memList = response1.data;
                vm.dayPay = {};
                vm.monthPay = {};
                vm.dayPayList = [];
                vm.dayPost = {};
                vm.dayPayUuid = {};
                vm.MemShow = function () {
                    //console.log(87);
                    $('.mem').fadeToggle();
                };
                vm.MoneyShow = function () {
                    $('.money').fadeToggle();
                };
                vm.MemPost = function () {
                    if (vm.mem.IsDelete) { swal("編輯失敗", "這傢伙被火了，不能改", "error"); }
                    else {
                        if (vm.mem.Name || vm.mem.Phone || vm.mem.Id || vm.mem.Salary || vm.mem.Addr || vm.mem.StartTime || vm.mem.Parent || vm.mem.ParentPhone) {
                            vm.mem.Job = "員工";
                            vm.mem.Auth = 1;
                            if (vm.mem.Mark) { }
                            else { vm.mem.Mark = Nope; }
                            vm.mem.CreateTime = new Date();
                            //console.log('mem', vm.mem);
                            if (vm.mem.Uuid) { }
                            else {
                                vm.mem.Uuid = uuid.v4();
                            }
                            console.log('mem', vm.mem);
                            PersonService.postPerson(vm.mem);
                            swal("編輯成功", "成功了", "success");
                            vm.mem = {};
                        }
                        else { swal("有空格", "請確認都有填寫", "error"); }
                    }
                }
                vm.memUpdate = function (mem) {
                    //console.log(item);
                    $('.mem').fadeIn();
                    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                    $body.animate({ scrollTop: 0 }, 300);
                    $('html, body').scrollTop(0);
                    vm.mem = mem;
                    vm.mem.StartDate = new Date(mem.StartDate);
                };
                vm.memDelete = function (mem) {
                    swal({
                        title: "你真的要刪除嗎?",
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "真的真的",
                        closeOnConfirm: false
                    }, function () {
                        PersonService.MemberDelete(mem.Uuid);
                    }
                );
                }
                vm.dayPayPost = function () {
                    if (vm.dayPayList.length != 0) {
                        if (Object.keys(vm.dayPay).length < 2) {
                            vm.dayPost.Uuid = uuid.v4();
                            vm.dayPost.CreateTime = new Date();
                            vm.dayPost.data = vm.dayPayList;
                            if (vm.dayPay.Mark) { }      //判定廠商備註 給nope
                            else { vm.dayPay.Mark = 'nope'; }
                            if (vm.dayPay.Bonus) { }      //判定廠商名稱 給nope
                            else { vm.dayPay.Bonus = 0; }
                            //console.log('vm.dayPost', vm.dayPost);
                            TimeCountService.postCount(vm.dayPost);
                            console.log("daypay", vm.dayPost);
                            vm.dayPost = {};
                            vm.dayPayList = [];
                            swal("成功", "success")
                        }
                        else {
                            swal("請按+之後再按送出唷=))", "!!!!!!!!!", "warning")
                        }


                    }
                    else {
                        if (vm.dayPay.Uuid && vm.dayPay.Date && vm.dayPay.Hours) {
                            vm.dayPayPlus(vm.dayPay)
                        }
                        else {
                            swal("尚未填寫資料!", "!!!!!!!!!", "warning")
                        }

                    }



                }

                vm.dayPayPlus = function (dayPay) {
                    if (vm.dayPay) {
                        if (vm.dayPay.Uuid && vm.dayPay.Date && vm.dayPay.Hours) {
                            vm.FindName(dayPay.Uuid);
                            $timeout(function () {
                                if (vm.dayPay.Mark) { }      //判定廠商備註 給nope
                                else { vm.dayPay.Mark = 'nope'; }
                                if (vm.dayPay.Bonus) { }      //判定廠商名稱 給nope
                                else { vm.dayPay.Bonus = 0; }
                                vm.dayPay.Name = $scope.dayPayName;
                                vm.dayPay.CreateTime = new Date();
                                //vm.dayPay.Name = '123';
                                //console.log(vm.dayPay);
                                vm.dayPayList.push(vm.dayPay);
                                console.log("PayList", vm.dayPayList);
                                vm.dayPay = {};
                            }, 100);
                            return 1;
                        }
                        else {
                            swal("你有資料沒打", "!!!!!", "error")
                            return 0;
                        }
                        //console.log(vm.FindName(dayPay.Uuid)+new Date());
                    }
                    else {
                        swal("你什麼資料都沒打", "!!!!!", "error")
                        return 0;
                    }
                    //console.log('vm.dayPayList', vm.dayPayList);
                }


                vm.FindName = function (uuid) {
                    angular.forEach(vm.memList, function (value, key) {
                        if (value.Uuid === uuid) {
                            console.log('value.Name', value.Name + new Date());
                            $scope.dayPayName = value.Name;
                        }
                    });
                }
                $("#start").datepicker({
                    showOtherMonths: true,
                    dateFormat: "yy-mm-dd",
                    maxDate: new Date(),
                    onSelect: function (start) {
                        vm.dayPayStart = start;
                        $("#end").datepicker('option', 'minDate', start)

                    }

                });
                $("#end").datepicker({
                    maxDate: new Date(),
                    showOtherMonths: true,
                    dateFormat: "yy-mm-dd",
                    //minDate: new Date(),
                    onSelect: function (end) {
                        vm.dayPayEnd = end;
                    }

                });
                vm.DayPaySelect = function () {
                    TimeCountService.getOneCountList(vm.dayPayStart, vm.dayPayEnd, vm.dayPayUuid).then(function (response3) {
                        vm.monthPay = response3.data;
                        console.log(vm.monthPay);
                        vm.Hours = 0; vm.Bonus = 0; vm.Tot = 0;
                        vm.helloworld = 1;
                        angular.forEach(vm.monthPay, function (value, key) {
                            vm.Hours += value.Hours;
                            vm.Bonus += value.Bonus;
                            vm.Tot += value.Tot;
                        });
                    })
                    TimeCountService.getTotal(vm.dayPayStart, vm.dayPayEnd, vm.dayPayUuid).then(function (response4) {
                        vm.totalPay = response4.data;
                        console.log(vm.totalPay);
                    })
                }
            })
        })

    }]);
    app.controller('OptionController', ['localStorageService', '$filter', '$rootScope', 'foodService', '$scope', function (localStorageService, $filter, $rootScope, foodService, $scope) {
        var vm = this;
        console.log('isOptionOnline?', navigator.onLine);
        foodService.getList().then(function (response) {
            vm.foodstatus = response.status;
            console.log('OptionStatus', vm.foodstatus);
            if (navigator.onLine) {
                if (vm.foodstatus == 200) {
                    vm.menuList = $rootScope.data.menuList;
                    vm.menuList = $filter('orderBy')(vm.menuList, 'id');
                    vm.pageSize = 10;
                    vm.curPage = 0;
                    vm.menuCurPage = 0;
                    vm.typeCurPage = 0;
                    vm.typeList = $rootScope.data.typeList;
                    vm.typeList = $filter('orderBy')(vm.typeList, 'Type');
                    console.log('typeList', vm.typeList);
                    vm.menuPageCount = Math.ceil(vm.menuList.length / vm.pageSize) - 1
                    vm.typePageCount = Math.ceil(vm.typeList.length / vm.pageSize) - 1
                    vm.item = {};
                    vm.submit = function () {
                        var copy = angular.copy(vm.item);
                        //console.log()
                        foodService.menuPost(vm.item);
                        if (vm.item.id) {
                            angular.forEach(vm.menuList, function (value, key) {
                                if (value.id === copy.id)
                                    vm.menuList[key] = copy;
                            });
                        } else {
                            var id = 1;
                            if (vm.menuList.length) {
                                id = vm.menuList[vm.menuList.length - 1]["id"] * 1 + 1;
                            }
                            copy.id = id;
                            vm.menuList.push(copy);
                        }
                        vm.isList = true;
                        vm.item = {};
                        localStorageService.setProperty("menuList", vm.menuList);
                    };
                    vm.menuUpdate = function (item) {
                        console.log(item);
                        $('.bp').fadeIn();
                        $('.ap').fadeOut();
                        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                        $body.animate({
                            scrollTop: 0
                        }, 300);
                        vm.item = item;
                    };
                    $scope.Type = [
                            {
                                id: '1',
                                Name: '肉'
                            },
                            {
                                id: '2',
                                Name: '菜'
                            },
                            {
                                id: '3',
                                Name: '加工'
                            }
                    ];
                    vm.typeUpdate = function (item) {
                        console.log(item);
                        $('.ap').fadeIn();
                        $('.bp').fadeOut();
                        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                        $body.animate({
                            scrollTop: 0
                        }, 300);
                        $('html, body').scrollTop(0);
                        vm.item = item;
                    };

                    vm.typeDelete = function (id) {
                        foodService.typeDelete(id);
                        swal({
                            title: "確定要刪除嗎？",
                            text: "您將無法恢復資料！",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "確定刪除！",
                            closeOnConfirm: false
                        },
                    function () {
                        swal(
                            {
                                title: "刪除！",
                                text: "此分類已被刪除。",
                                type: "success"
                            }
                            , function () {
                                location.reload();
                            }
                            );

                    });
                    };
                    vm.menuDelete = function (id) {
                        foodService.menuDelete(id);
                    };
                    vm.show = 1;
                    vm.menuShow = function () {
                        $('.bp').fadeToggle();
                    };
                    vm.show = 1;
                    vm.typeShow = function () {
                        $('.ap').fadeToggle();
                    };
                    vm.typePost = function () {
                        foodService.typePost(vm.item);
                        vm.item = {};
                    };
                }
                else {
                    swal("無法連接到伺服器", "請您連繫工程師大人", "error");
                }
            }
            else {
                swal("失去連線", "請檢察您的網路或連繫工程師大人", "error");
            }
        }).catch(function (response) {
            vm.foodstatus = response.status;
            console.log('OptionStatus', vm.foodstatus);
            if (navigator.onLine) {
                if (vm.foodstatus == 200) {
                    vm.menuList = $rootScope.data.menuList;
                    vm.menuList = $filter('orderBy')(vm.menuList, 'id');
                    vm.pageSize = 10;
                    vm.curPage = 0;
                    vm.menuCurPage = 0;
                    vm.typeCurPage = 0;
                    vm.typeList = $rootScope.data.typeList;
                    vm.typeList = $filter('orderBy')(vm.typeList, 'Type');
                    vm.menuPageCount = Math.ceil(vm.menuList.length / vm.pageSize) - 1
                    vm.typePageCount = Math.ceil(vm.typeList.length / vm.pageSize) - 1
                    vm.item = {};
                    vm.submit = function () {
                        var copy = angular.copy(vm.item);
                        //console.log()
                        foodService.menuPost(vm.item);
                        if (vm.item.id) {
                            angular.forEach(vm.menuList, function (value, key) {
                                if (value.id === copy.id)
                                    vm.menuList[key] = copy;
                            });
                        } else {
                            var id = 1;
                            if (vm.menuList.length) {
                                id = vm.menuList[vm.menuList.length - 1]["id"] * 1 + 1;
                            }
                            copy.id = id;
                            vm.menuList.push(copy);
                        }
                        vm.isList = true;
                        vm.item = {};


                        localStorageService.setProperty("menuList", vm.menuList);
                    };
                    vm.update = function (item) {
                        console.log(item);
                        vm.item = item;
                    };
                    vm.typeDelete = function (id) {
                        swal({
                            title: "確定删除吗？",
                            text: "你將無法復原該分類！",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "確定刪除！",
                            closeOnConfirm: false
                        },
                    function () {
                        foodService.typeDelete(id);
                        swal("删除！", "你的分類已經被全部删除。", "success");
                    });

                    };
                    vm.menuDelete = function (id) {
                        foodService.menuDelete(id);
                    };

                    vm.menuShow = function () {


                        $('.bp').fadeToggle();

                    };

                    vm.typeShow = function () {

                        $('.ap').fadeToggle();

                    };
                    vm.typePost = function () {
                        foodService.typePost(vm.item);
                        vm.item = {};
                    };
                }
                else {
                    swal("無法連接到伺服器", "請您連繫工程師大人", "error");
                }
            }
            else {
                swal("失去連線", "請檢察您的網路或連繫工程師大人", "error");
                $scope.setTab(1);
            }
        });




        //一直都想著他，折磨自己對嗎?
        //過去的情話，回憶全是傷疤

        //如果有一個懷抱勇敢不計代價，別讓我非，將我溫柔花樣，就讓我非，曾經眷戀太陽
        //用你的熱情，讓綁發燒
        //黨不住的魅力kiss Radio!!
        //$('button').delegate('.addItem', 'click', function () {
        //    var $name = $(this).parent('#itemName');
        //    var $price = $(this).parent('#itemPrice');
        //    var $type = $(this).parent('#itemClass');
        //    console.log($name);
        //    alert("123123");
        //    crudService.src.addItem({name:$name,vnname:'',price:$price,type:$type});
        //})
    }]);
    app.controller('BarCtrlController', ['ReportService', '$timeout', '$scope', '$rootScope', 'ExpendService', function (ReportService, $timeout, $scope, $rootScope, ExpendService) {
        var vm = this;
        vm.ChartList = $rootScope.data.chartList;
        vm.daytdshow = function () {
            //console.log(87);
            $('.daytd').fadeIn();
            $('.chart').fadeOut();
        };
        vm.chartshow = function () {
            $('.daytd').fadeOut();
            $('.chart').fadeIn();
            ReportService.getchartdata("w").then(function (ChartList) {
                vm.ChartList = ChartList;
            })
        };

        //console.log("123")
        //vm.Changeday = -1
        //console.log(vm.Changeday)
        vm.ReportList = $rootScope.data.reportList;
        $("#datepicker").datepicker({
            showOtherMonths: true,
            dateFormat: "yy-mm-dd",
            maxDate: "+0d",
            onSelect: function (datepick) {
                //swal("QQ", "QQAQQ", "success")
                //DateDifference(StartDate,EndDate)
                var today = new Date($.datepicker.formatDate('yy-mm-dd', new Date()));
                var datepick = new Date(datepick);
                var ii = (today - datepick) / 86400000;
                //console.log(today);
                //console.log(datepick);
                //console.log(ii);
                ReportService.getdata(ii).then(function (ReportList) {
                    vm.ReportList = ReportList;
                })
            }
        });

        //vm.datepicker = 0;
        //垃圾
        //$scope.datechange = function () {
        //    console.log(0.0);
        //    swal("QQ", "error");
        //}
        vm.Changeday = function (ii) {
            //console.log(this.ReportList);
            ReportService.getdata(ii).then(function (ReportList) {
                vm.ReportList = ReportList;
            })
        };




        ///****圖表***///
        $scope.myRender = {

            "height": "100%",
            "autoResize": "true"
        };
        $scope.myJson = {
            type: 'line',
            title: {
                text: 'iBower 周平均銷售'

            },

            plot: {
                tooltip: {
                    visible: false
                },
                cursor: 'hand',
                valueBox: {
                    text:"%t",
                    placement: "top",
                    offsetR: 20
                },
            },
            //legend: {
            //    adjustLayout: true,
            //    align: 'center',
            //    verticalAlign: 'bottom',
            //    maxItems: 5,
            //    overflow: 'scroll',
            //    "scroll": {
            //        "bar": {
            //            "background-color": "#ffe6e6",
            //            "border-left": "1px solid red",
            //            "border-right": "1px solid red",
            //            "border-top": "1px solid red",
            //            "border-bottom": "1px solid red",
            //        },
            //        "handle": {
            //            "background-color": "#ffe6e6",
            //            "border-left": "2px solid red",
            //            "border-right": "2px solid red",
            //            "border-top": "2px solid red",
            //            "border-bottom": "2px solid red",
            //            "border-radius": "15px"
            //        }
            //    }
            //},
            crosshairX: {},
            scaleX: {
                markers: [],
                offsetEnd: 75,
                "labels": ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
            },
            series:
            vm.ChartList.data
        };


    }]);
    app.controller('ExpendController', ['$timeout', '$scope', '$rootScope', 'ExpendService', function ($timeout, $scope, $rootScope, ExpendService) {
        var vm = this;
        ExpendService.getExpend().then(function (res) {
            vm.ExpendList = res.data;
            console.log('haha', vm.ExpendList);
            console.log('A營收B成本C人事', vm.ExpendList.A);
            vm.StartDay = new Date($.datepicker.formatDate('yy-mm-dd', new Date()));
            vm.StartDay.setDate(1);
            vm.EndDay = new Date($.datepicker.formatDate('yy-mm-dd', new Date()));
            vm.EndDay.setMonth(vm.EndDay.getMonth() + 1);
            vm.EndDay.setDate(1);
            vm.EndDay.setDate(vm.EndDay.getDate() - 1);
            //console.log('S', vm.StartDay);
            //console.log('E', vm.EndDay);
            vm.Acount = 0;
            vm.Atot = 0;
            vm.Bcount = 0;
            vm.Btot = 0;
            vm.Ccount = 0;
            vm.Ctot = 0;
            vm.Dtot = 0;
            vm.Etot = 0;
            angular.forEach(vm.ExpendList.A, function (value, key) {
                vm.Acount = vm.Acount + value.Count;
                vm.Atot += value.Totle;
            });

            angular.forEach(vm.ExpendList.B, function (value, key) {
                vm.Bcount = vm.Bcount + value.Count;

                vm.Btot += value.Totle;
            });

            angular.forEach(vm.ExpendList.C, function (value, key) {
                vm.Ccount = vm.Ccount + value.Count;

                vm.Ctot += value.Totle;
            });

            angular.forEach(vm.ExpendList.D, function (value, key) {

                vm.Dtot += value.Totle;
            });

            angular.forEach(vm.ExpendList.E, function (value, key) {

                vm.Etot += value.Totle;
            });
            vm.Percent = function (aaa) {
                return aaa / vm.Atot * 100;
            }
            $("#start").datepicker({
                showOtherMonths: true,
                dateFormat: "yy-mm-dd",
                maxDate: new Date(),
                onSelect: function (start) {
                    vm.StartDay = start;
                }
            });
            $("#end").datepicker({
                maxDate: new Date(),
                showOtherMonths: true,
                dateFormat: "yy-mm-dd",
                //minDate: new Date(),
                onSelect: function (end) {
                    vm.EndDay = end;
                }
            });
            //console.log('S',vm.StartDay);
            //console.log('E',vm.EndDay);
            vm.Post = function (Start, End) {
                //console.log('S', Start);
                //console.log('E', End);
                ExpendService.getYinYaBiao(Start, End).then(function (res2) { vm.ExpendList = res2.data; })
                console.log('data', vm.ExpendList);
            }
        });
    }]);
    app.filter('pageStartFrom', [function () {
        return function (input, start) {
            start = +start;
            if (input != 'undefined')
                return input.slice(start);
        }
    }]);
    $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.loading = true;
                return $q.resolve(config);
            },
            'response': function (response) {
                $rootScope.loading = false;
                return $q.resolve(response);
            },
            'requestError': function (rejection) {
                $rootScope.loading = false;
                return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                $rootScope.loading = false;
                return $q.reject(rejection);
            }
        }
    }])


})();
