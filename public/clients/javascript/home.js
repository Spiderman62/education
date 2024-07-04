const lenis = new Lenis()
lenis.on('scroll', (e) => {
});
function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
const scrollTrigger = {
	main(){
		gsap.from(".section_0",{
			y:500,
			duration:1.4,
			opacity:0,
			ease:Power2.easeInOut,
		});
		gsap.from('.section_1',{
			y:500,
			duration:1.4,
			opacity:0,
			ease:Power2.easeInOut,
			scrollTrigger:{
				trigger:'.section_1',
				toggleActions:"restart none none none",
				start:"-70% 100%"
			},
			
		});
		gsap.from('.section_1 .details .item',{
			y:500,
			duration:1.4,
			opacity:0,
			ease:Power2.easeInOut,
			stagger:.2,
			scrollTrigger:{
				trigger:'.section_1',
				toggleActions:"restart none none none",
				start:"-10% 100%"
			}
		});
		gsap.from(".section_2 .title-section-2",{
			y:200,
			opacity:0,
			duration:1.4,
			ease:Power2.easeInOut,
			scrollTrigger:{
				trigger:".section_2",
				toggleActions: "restart none none none"
			}
		});
		gsap.from(".section_2 .wrapper .left",{
			x:-200,
			opacity:0,
			duration:1.4,
			ease:Power2.easeInOut,
			scrollTrigger:{
				trigger:".section_2",
				toggleActions: "restart none none none",
				start:"20% 100%"
			}
		});
		gsap.from(".section_2 .wrapper .right .item",{
			x:200,
			opacity:0,
			duration:1,
			ease:"back.inOut",
			stagger:.2,
			scrollTrigger:{
				trigger:".section_2",
				toggleActions: "restart none none none",
				start:"20% 100%"
			}
		});
		gsap.from(".section_3>.title",{
			y:200,
			opacity:0,
			duration:1,
			ease:"back.inOut",
			scrollTrigger:{
				trigger:".section_3",
				toggleActions: "restart none none none",
				start:"0% 100%",
			}
		});
		gsap.from(".section_3 .wrapper .item",{
			y:200,
			opacity:0,
			duration:1.3,
			ease:"back.inOut",
			stagger:.3,
			scrollTrigger:{
				trigger:".section_3",
				toggleActions: "restart none none none",
				start:"0% 100%",
			}
		});
		gsap.from(".section_4 .wrapper>.title",{
			x:-200,
			opacity:0,
			duration:1,
			ease:"back.inOut",
			scrollTrigger:{
				trigger:".section_4",
				toggleActions: "restart none none none",
				start:"0% 100%",
			}
		});
		gsap.from(".section_4 .wrapper .wrapper-feedback .item:nth-child(odd)",{
			x:-200,
			opacity:0,
			duration:1.3,
			ease:"back.inOut",
			stagger:.3,
			scrollTrigger:{
				trigger:".section_4",
				toggleActions: "restart none none none",
				start:"0% 100%",
			}
		});
		gsap.from(".section_4 .wrapper .wrapper-feedback .item:nth-child(even)",{
			x:200,
			opacity:0,
			duration:1.3,
			ease:"back.inOut",
			stagger:.3,
			scrollTrigger:{
				trigger:".section_4",
				toggleActions: "restart none none none",
				start:"0% 100%",
			}
		});
	}
}
scrollTrigger.main();
