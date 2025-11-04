require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
version = package["version"]

Pod::Spec.new do |s|
  s.name                   = 'ScanditCapacitorDatacaptureLabel'
  s.version                = version
  s.summary                = package["description"]
  s.license                = package["license"]
  s.homepage               = package["repository"]["url"]
  s.author                 = package["author"]
  s.source                 = { :git => package["repository"]["url"], :tag => s.version.to_s }
  s.source_files           = "ios/Sources/**/*.{swift,h,m,c,cc,mm,cpp}"
  s.ios.deployment_target  = "15.0"
  s.swift_version          = "5.7"

  s.dependency "Capacitor"
  s.dependency "ScanditCapacitorDatacaptureCore", "= #{version}"
  s.dependency "ScanditCapacitorDatacaptureBarcode", "= #{version}"
  s.dependency "scandit-datacapture-frameworks-label", '= 8.0.0'
end
