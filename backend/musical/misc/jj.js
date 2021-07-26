//initialize
var arrTab = new Array(10);		//tab별 속성상태 저장(초기) - 전역
var sImageIndex = 0;				//스틸컷 current index
var sImage;							//스틸컷 src 배열


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////interface 커뮤니티 페이지에서 호출 함.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resize_iframe(size) {
	$("bbslist").style.height = size;
	return;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////interface 커뮤니티 페이지에서 호출 함.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Initial() {//null.html 에서 호출하여 해당 뒤로가기 버튼 누를때 모든탭 보이도록
	//location.reload();	 //reload시 문제발생.
	TablAllVisible();
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


function fSetupStillImage(sArr) {//server side data to client array
	eval("sImage = [" + sArr + "];");
}



function fInitStillTab(sReqPlayNo) {


		try {
			//default run
			if ($("bbsmain")) $("bbsmain").style.display = "none";
			if ($("bbslist")) $("bbslist").style.display = "none";

			//자동링크
			AutoLinkLib.Play($("dvStory", "sTitleContent"), sReqPlayNo);
			Deprecated();//not completed tab

			$("bbslist").src = "/playdb/null.html";

			//해당 탭의 속성을 저장해 놓는다
			for (var i=1;i<=10;i++) {
				arrTab[i] = $("tab" + i).style.display; //block 상태인 것만 노출 되도록 저장한다.
			}
		} catch (ex) {alert(ex)}
}




//출연진 확장
function f_ShowCharacter() {

	return;
	/*
	var last = $("frmShowCharCount").value;

	for (var k=1;k<= last;k++) {

		if ($("idCharacter_"+k) != null) {
			$("idCharacter_"+k).style.display = "block";
		}

	}
	*/
}


//스틸이미지 열기
function f_OpenStillImage(sReqPlayNo,sReqMediaNo) {
	window.open("/magazine/PhotoDetail.asp?sReqPlayNo=" + sReqPlayNo + "&sReqMediaNo=" + sReqMediaNo,"popup","width=870,height=492");
}

//사진 팝업 열기
function f_OpenAlbumPopup(sReqPlayNo, sReqMediaNo, sReqKind, sPhotoNo) {
	window.open("./PopupAlbum.asp?PlayNo=" + sReqPlayNo + "&MediaNo=" + sReqMediaNo + "&Kind=" + sReqKind + "&PhotoNo=" + sPhotoNo, "popup", "width=750,height=620");
}

//동영상 팝업 열기
function f_OpenMoviePopup(sReqPlayNo, sReqMediaNo) {
	window.open("./PopupMovie.asp?PlayNo=" + sReqPlayNo + "&MediaNo=" + sReqMediaNo, "popup", "width=750,height=620");
}

//모든 텝 감춤
function TablAllHidden() {

	for (var i=1;i<=10;i++) {
		if ($("tab" + i) != undefined)
			$("tab" + i).style.display = "none";

		if ($("bbs" + i) != undefined)
			$("bbs" + i).style.display = "none";
	}


	if($("MTitleImg")) $("MTitleImg").style.display = "none";
	if($("tabside")) $("tabside").style.display = "none";
}


//모든 텝 보이기 단 처음부터 안보였던건 안보이게.
function TablAllVisible() {

	var temp

	//try {
		//View Data Exists Tab

		for (var i=1;i<=10;i++) {
			temp = arrTab[i];

			if (temp != "none" && temp!= undefined) {
				$("tab" + i).style.display = "block";
			}

			if ($("bbs" + i) != undefined)
				$("bbs" + i).style.display = "block";

		}
		if($("MTitleImg")) $("MTitleImg").style.display = "block";
		if($("tabside")) $("tabside").style.display = "block";
		if($("bbsmain")) $("bbsmain").style.display = "none";
		if($("bbslist")) $("bbslist").style.display = "none";

		Deprecated();//not completed tab

	//} catch (ex)  {
		//alert(ex);
	//}

}



//커뮤니티 열기
function Showbbs(nBBSNo,sFlag,sPlayNo) {

	TablAllHidden();
	$("bbslist").src = "http://www.playdb.co.kr/community/Community_Common.asp?BBSNo=" + nBBSNo + "&KindType=042001&KindNo=" + sPlayNo + "&JobFlag=" + sFlag;

	if($("bbsmain")) $("bbsmain").style.display = "block";
	if($("bbslist")) $("bbslist").style.display = "block";

}


//관람후기 및 미디어 리뷰 hidden
function Deprecated() {

	//미디어 리뷰 invisible
	if($("bbs4")) $("bbs4").style.display = "none";

}



//bbs 관련 조금보기
function fanviewContent(cnt_)
{
	for ( var vi=0; vi<26; vi++ )
	{
		if ( vi != parseInt(cnt_) )
		{
			if ( $("BbsContentList" + vi) != null )
			{
				$("BbsContentList" + vi).style.display = "none";
			}
		}
		else
		{
			if ( $("BbsContentList" + cnt_).style.display == "" )
			{
				$("BbsContentList" + cnt_).style.display = "none";
			}
			else
			{
				$("BbsContentList" + cnt_).style.display = "";
			}
		}
	}
}




function OpenPopup(sUrl, sTarget, nX, nY) {

	var sLocation;
	sLocation = "width=" + nX + ",height=" + nY;
	window.open(sUrl, sTarget, sLocation);
}

function OpenPopupEtc(sUrl, sTarget, nX, nY, sEtc) {
	var sLocation;
	sLocation = "width=" + nX + ",height=" + nY + sEtc;
	window.open(sUrl, sTarget, sLocation);
}




//스틸컷 to left
function fImageShift_l() {
	if (sImageIndex > 0)  {
		sImageIndex--;
		$("imgStill").src = sImage[sImageIndex];
		fStillArrowCheck();
	}
}

//스틸컷 to right
function fImageShift_r() {
	//alert(sImageIndex + "," + sImage.length);
	if (sImageIndex < sImage.length-1) {
		sImageIndex++;
		$("imgStill").src = sImage[sImageIndex];
		fStillArrowCheck();
	}
}


function fStillArrowCheck() {//스틸컷 Arrow Check

	//img_StillLeft, img_StillRight 로 체크한다.
	var sLeftOn = "http://ticketimage.interpark.com/TicketImage/07playdb/arrow_left_01.gif"
	var sRightOn = "http://ticketimage.interpark.com/TicketImage/07playdb/arrow_right_01.gif"

	var sLeft = "http://ticketimage.interpark.com/TicketImage/07playdb/arrow_gleft_01.gif"
	var sRight = "http://ticketimage.interpark.com/TicketImage/07playdb/arrow_gright_01.gif"

	$("dvImageCount").innerHTML = "(" + sImage.length + "개)";

	//alert("a" +sImage[sImageIndex]);

	if (sImage[sImageIndex-1]  ) $("img_StillLeft").src = sLeftOn
	else $("img_StillLeft").src = sLeft;

	if (sImage[sImageIndex+1] ) $("img_StillRight").src = sRightOn
	else $("img_StillRight").src = sRight;

}


//여기서부터 새롭게..


//********************************************************************
//	기본소개 가져오는 함수
//********************************************************************
function fnAjaxRequest(url, callback)
{
	var myAjax = new Ajax.Request(
				url,
				{	method: 'get',
					onComplete: callback
				}
			);

}

function fnGetDetail(playno)
{
	var url = "./PlaydbDetail_content.asp?PlayNo="+ playno +"&TabKind=1";
	//alert(url);
	fnAjaxRequest(url, fnGetDetailCallBack);
}

function fnGetDetailCallBack(xmlHttp)
{
	if(xmlHttp.readyState == 4)
	{
		if(xmlHttp.status == 200)
		{
			document.getElementById("DivBasic").innerHTML = xmlHttp.responseText;
		}
	}
}


function pastInitial()
{
	var Tabimg = "http://ticketimage.interpark.com/TicketImage/playdb/2010_renewal/";
	$("Tab1").src = Tabimg + "playdetail_tab1_off.gif";
	$("Tab2").src = Tabimg + "playdetail_tab2_off.gif";
	$("Tab3").src = Tabimg + "playdetail_tab3_off.gif";
	$("Tab4").src = Tabimg + "playdetail_tab4_off.gif";
	$("Tab5").src = Tabimg + "playdetail_tab5_off.gif";
	$("Tab6").src = Tabimg + "playdetail_tab6_off.gif";
	//$("Tab7").src = Tabimg + "playdetail_tabtxt1_off.gif";
	$("Tab8").src = Tabimg + "playdetail_tabtxt2_off.gif";
	$("Tab9").src = Tabimg + "playdetail_tabtxt5_off.gif";
	document.getElementById("DivBasic").style.display = "none";
	document.getElementById("DiviFrmContent").style.display = "none";
	document.getElementById("DivReview").style.display = "none";

//	parent.$("RatingDiv").style.visibility = "hidden";
//	parent.$("RatingDiv").style.display = "none";
}

function Init(kind,playno,etc)
{
	TabChange(kind,playno,etc);
	//$("DivContent"+ kind).style.display="";

	//document.getElementById("iFrmFan").src = "/community/Community_Common.asp?BBSNo=2&KindType=042001&KindNo="+ playno +"&iFrmName=iFrmFan&ListFlag=L";
	//document.getElementById("iFrmLink").src = "/community/Community_Common.asp?BBSNo=6&KindType=042001&KindNo="+ playno +"&iFrmName=iFrmLink&ListFlag=L";
	//document.getElementById("iFrmEvent").src = "/playdb/playdbDetail_Content.asp?iFrmName=iFrmEvent&TabKind=8&PlayNo="+ playno +"&etc=detail&pagesize=5&ListFlag=";
}

function TabChange(kind,playno,etc)
{
	var bbsno_ = "";
	var Tabimg = "http://ticketimage.interpark.com/TicketImage/playdb/2010_renewal/";

	if(kind=="7" && etc == "I" && strMemberId == "")
	{
		alert("글등록시에 로그인이 필요합니다.");
		window.open("http://www.playdb.co.kr/member/login_pop.asp", "login", "width=360, height=400");
		return;
	}

	pastInitial();

	if(kind == "") kind="1"
	if (kind >= "1" && kind <= "6"){
		$("Tab"+kind).src = Tabimg + "playdetail_tab"+ kind +"_on.gif";
	}else if (kind >= "7" && kind < "9"){
		$("Tab"+kind).src = Tabimg + "playdetail_tabtxt"+ (kind-6) +"_on.gif";
	}else if (kind = "9"){
		$("Tab"+kind).src = Tabimg + "playdetail_tabtxt5_on.gif";
	}

	if(kind == "1")
	{
//		fnGetDetail(playno);

		document.getElementById("DiviFrmContent").style.display = "none";
		document.getElementById("DivBasic").style.display = "";
	}
	else if(kind=="2" || kind=="3" || kind=="4" || kind=="5")
	{
		document.getElementById("iFrmContent").src = "./playdbDetail_Content.asp?TabKind="+kind +"&PlayNo="+ playno +"#"+ etc;
		document.getElementById("DiviFrmContent").style.display = "";
	}
	else if(kind=="7")
	{
		bbsno_ = "2";		//관객리뷰(공연팬게시판)
		if(etc == "I")	//글쓰기
		{
			document.getElementById("iFrmContent").src = "/community/Community_Common.asp?BBSNo=" + bbsno_ + "&KindType=042001&iFrmName=iFrmContent&JobFlag=I&ListFlag=L&KindNo=" + playno;
			document.getElementById("DiviFrmContent").style.display = "";
		}
		else
		{
			document.getElementById("iFrmRating1").src = "PlaydbRating_list.asp?PlayNo="+ playno +"&iFrmName=iFrmRating1";
			document.getElementById("DivReview").style.display = "";
			document.getElementById("iFrmContent").src = "/community/Community_Common.asp?BBSNo=" + bbsno_ + "&KindType=042001&iFrmName=iFrmContent&ListFlag=L&KindNo=" + playno +"&Sort="+ etc;
			document.getElementById("DiviFrmContent").style.display = "";
		}
	}
	else if(kind=="8")
	{
		bbsno_ = "8";		//관객리뷰(공연팬게시판)
		document.getElementById("iFrmContent").src = "/community/Community_Common.asp?BBSNo=" + bbsno_ + "&KindType=042001&iFrmName=iFrmContent&KindNo=" + playno +"&Sort="+ etc;
		document.getElementById("DiviFrmContent").style.display = "";
	}
	else if(kind=="9")
	{
		bbsno_ = "7";		//업데이트 요청
		document.getElementById("iFrmContent").src = "/community/RequestUpdate_Write.asp?iFrmName=iFrmContent&KindType=042001&KindNo=" + playno + "&KindName=" + etc;
		document.getElementById("DiviFrmContent").style.display = "";
	}
	else		//팬의한마디(이벤트댓글)
	{
		document.getElementById("iFrmContent").src = "./playdbDetail_Content.asp?TabKind="+kind +"&PlayNo="+ playno +"&iFrmName=iFrmContent&etc=image&pagesize=20&ListFlag="+ etc;
		document.getElementById("DiviFrmContent").style.display = "";
	}
}





function GoRating(Playno)
{
	if(strMemberId == "")
	{
		alert("글등록시에 로그인이 필요합니다.");
		window.open("http://www.playdb.co.kr/member/login_pop.asp", "login", "width=360, height=400");
		return;
	}

	if($("SelRating").value == "")
	{
		alert("별점을 선택해주세요.");
		return;
	}

	document.getElementById("iFrmRating").src = "/playdb/playdbRatingWork.asp?PlayNo="+ Playno +"&Rating="+ $("SelRating").value;
	$("RatingDiv").style.visibility = "hidden";
	$("RatingDiv").style.display = "none";
}

function resize_iframe(size,iFrmName)
{
	if(iFrmName != "")
	{
		document.getElementById(iFrmName).height = size;
	}
	else
	{
		document.getElementById("iFrmContent").height = size;
	}
}


function fnAddComma(n)
{
	n = n + "";
	var s = "";
	var j = 1;
	for(i=n.length-1; i>-1; i--)
	{
		s = n.substring(i, i+1) + s;
		if(j++%3 == 0 && i > 0)
			s = "," + s;
	}
	return s;
}


function setLayerBox(name, e) {
    var e = e || window.event;
	var obj =  document.getElementById(name);
	//var scrollLeft     = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    obj.style.left = e.clientX - (e.clientX - 560) + (document.documentElement.scrollLeft || document.body.scrollLeft) + 20 + 'px';  // 마우스
    //obj.style.left = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) + 20 + 'px';  // 마우스
    //obj.style.left = 540 + scrollLeft + 20 + 'px';  // 마우스
    obj.style.top = e.clientY  + (document.documentElement.scrollTop || document.body.scrollTop) + 'px';  // 포인트에 위치
	obj.style.visibility = "visible";
	obj.style.display = "block";
}