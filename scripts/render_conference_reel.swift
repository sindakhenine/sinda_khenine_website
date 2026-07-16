import AVFoundation
import AppKit
import CoreGraphics

let width=1280, height=720, fps:Int32=30, duration=30
let output=URL(fileURLWithPath:"public/media/sinda_conference_reel.mp4")
let poster=URL(fileURLWithPath:"public/media/sinda_conference_reel_poster.jpg")
try FileManager.default.createDirectory(at:output.deletingLastPathComponent(),withIntermediateDirectories:true)
try? FileManager.default.removeItem(at:output)

let scenes:[(String,[String])]=[
  ("SINDA KHENINE",["ML CONFERENCE SPEAKER"]),
  ("TECHNICAL THEMES",["ENTERPRISE DATA","DOCUMENT UNDERSTANDING","RELIABLE AI AGENTS"]),
  ("MUNICH 2025",["UNIFIED DATA REPOSITORIES","AND AI COPILOTS"]),
  ("BERLIN 2025",["STRATEGIC INSIGHT WITH","UNIFIED DATA AND AI"]),
  ("MUNICH 2026",["DOCUMENT UNDERSTANDING","AT SCALE"]),
  ("BERLIN 2026",["CONTEXT ENGINEERING IS THE","NEW PROMPT ENGINEERING"]),
  ("FROM CONTEXT TO ACTION",["RELIABLE AUTONOMOUS","ENTERPRISE AGENTS"]),
  ("SINDA KHENINE",["DATA. CONTEXT. RELIABLE ACTION."])
]

func color(_ hex:Int,_ a:CGFloat=1)->CGColor{CGColor(red:CGFloat((hex>>16)&255)/255,green:CGFloat((hex>>8)&255)/255,blue:CGFloat(hex&255)/255,alpha:a)}
let ink=color(0x10110f), paper=color(0xf3eee3), copper=color(0xa65f43), muted=color(0x8f968c)

func drawText(_ text:String,_ x:CGFloat,_ y:CGFloat,_ size:CGFloat,_ cg:CGContext,_ foreground:NSColor,_ bold:Bool=false){
  let font=bold ? NSFont.systemFont(ofSize:size,weight:.semibold) : NSFont.systemFont(ofSize:size,weight:.regular)
  let attrs:[NSAttributedString.Key:Any]=[.font:font,.foregroundColor:foreground,.kern:size*0.08]
  NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=NSGraphicsContext(cgContext:cg,flipped:false)
  NSAttributedString(string:text,attributes:attrs).draw(at:NSPoint(x:x,y:y));NSGraphicsContext.restoreGraphicsState()
}

func render(_ frame:Int)->CGImage{
  let cs=CGColorSpaceCreateDeviceRGB(), bytes=width*4
  let data=UnsafeMutableRawPointer.allocate(byteCount:bytes*height,alignment:64);data.initializeMemory(as:UInt8.self,repeating:0,count:bytes*height)
  let cg=CGContext(data:data,width:width,height:height,bitsPerComponent:8,bytesPerRow:bytes,space:cs,bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
  cg.setFillColor(ink);cg.fill(CGRect(x:0,y:0,width:width,height:height))
  let seconds=Double(frame)/Double(fps), sceneLength=Double(duration)/Double(scenes.count), index=min(Int(seconds/sceneLength),scenes.count-1)
  let local=(seconds-Double(index)*sceneLength)/sceneLength, ease=CGFloat(sin(min(local*1.7,1)*Double.pi/2))
  let drift=CGFloat(frame%600)/600
  cg.setStrokeColor(color(0x554b42,0.72));cg.setLineWidth(1)
  for i in 0..<9 {let y=CGFloat(95+i*64);cg.move(to:CGPoint(x:70,y:y));cg.addLine(to:CGPoint(x:1210,y:y));cg.strokePath()}
  for i in 0..<6 {let x=CGFloat(90+i*205)+drift*24;cg.move(to:CGPoint(x:x,y:78));cg.addLine(to:CGPoint(x:x,y:642));cg.strokePath()}
  cg.setStrokeColor(copper);cg.setLineWidth(3)
  let nodes=[CGPoint(x:115,y:156),CGPoint(x:302,y:282),CGPoint(x:518,y:218),CGPoint(x:744,y:398),CGPoint(x:982,y:316),CGPoint(x:1160,y:500)]
  cg.move(to:nodes[0]);for p in nodes.dropFirst(){cg.addLine(to:p)};cg.strokePath()
  for (i,p) in nodes.enumerated(){cg.setFillColor(i<=index%nodes.count ? copper:muted);cg.fillEllipse(in:CGRect(x:p.x-7,y:p.y-7,width:14,height:14))}
  let docsX:CGFloat=900
  for i in 0..<3 {let r=CGRect(x:docsX+CGFloat(i*22),y:95+CGFloat(i*15),width:190,height:245);cg.setFillColor(color(0x20211f,0.94));cg.fill(r);cg.setStrokeColor(i==2 ? copper:color(0x75695d));cg.stroke(r);for j in 0..<5{cg.move(to:CGPoint(x:r.minX+22,y:r.maxY-48-CGFloat(j*28)));cg.addLine(to:CGPoint(x:r.maxX-22,y:r.maxY-48-CGFloat(j*28)));cg.strokePath()}}
  let alpha=min(ease*1.25,1);let main=NSColor(cgColor:paper.copy(alpha:alpha)!)!, accent=NSColor(cgColor:copper.copy(alpha:alpha)!)!
  drawText(String(format:"%02d",index+1),82,604,18,cg,accent,true)
  drawText(scenes[index].0,82,488,index==6 ? 46:54,cg,main,true)
  for (lineNo,line) in scenes[index].1.enumerated(){drawText(line,86,420-CGFloat(lineNo*52),25,cg,lineNo==0 ? accent:main)}
  cg.setFillColor(copper);cg.fill(CGRect(x:82,y:466,width:CGFloat(120+local*390),height:4))
  let image=cg.makeImage()!;data.deallocate();return image
}

let writer=try AVAssetWriter(outputURL:output,fileType:.mp4)
let settings:[String:Any]=[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:width,AVVideoHeightKey:height,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:4_000_000,AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel]]
let input=AVAssetWriterInput(mediaType:.video,outputSettings:settings);input.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA,kCVPixelBufferWidthKey as String:width,kCVPixelBufferHeightKey as String:height])
writer.add(input);writer.startWriting();writer.startSession(atSourceTime:.zero)
for frame in 0..<(duration*Int(fps)){
  while !input.isReadyForMoreMediaData{Thread.sleep(forTimeInterval:0.002)}
  var buffer:CVPixelBuffer!;CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&buffer);CVPixelBufferLockBaseAddress(buffer,[])
  let cg=CGContext(data:CVPixelBufferGetBaseAddress(buffer),width:width,height:height,bitsPerComponent:8,bytesPerRow:CVPixelBufferGetBytesPerRow(buffer),space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.noneSkipFirst.rawValue|CGBitmapInfo.byteOrder32Little.rawValue)!
  cg.draw(render(frame),in:CGRect(x:0,y:0,width:width,height:height));CVPixelBufferUnlockBaseAddress(buffer,[])
  adaptor.append(buffer,withPresentationTime:CMTime(value:CMTimeValue(frame),timescale:fps))
}
input.markAsFinished();await writer.finishWriting()
guard writer.status == .completed else{fatalError(writer.error?.localizedDescription ?? "Render failed")}
let posterImage=NSBitmapImageRep(cgImage:render(Int(fps)));try posterImage.representation(using:.jpeg,properties:[.compressionFactor:0.9])!.write(to:poster)
print("Rendered \(output.path), \(duration)s, 1280x720, silent H.264")
