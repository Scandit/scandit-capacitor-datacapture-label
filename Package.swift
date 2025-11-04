// swift-tools-version: 5.9
import PackageDescription
import Foundation

// Read version from package.json
func getVersion() -> String {
    let packageJSONPath = Context.packageDirectory + "/package.json"
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: packageJSONPath)),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let version = json["version"] as? String else {
        fatalError("Could not read version from package.json at \(packageJSONPath)")
    }
    return version
}

let version = getVersion()

let package = Package(
    name: "ScanditCapacitorDatacaptureLabel",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "ScanditCapacitorDatacaptureLabel",
            targets: ["ScanditCapacitorLabel"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(url: "https://github.com/Scandit/scandit-capacitor-datacapture-core.git", exact: Version(stringLiteral: version)),
        .package(url: "https://github.com/Scandit/scandit-capacitor-datacapture-barcode.git", exact: Version(stringLiteral: version)),
        .package(url: "https://github.com/Scandit/scandit-datacapture-frameworks-label.git", exact: Version(stringLiteral: version)),
    ],
    targets: [
        .target(
            name: "ScanditCapacitorLabel",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "ScanditCapacitorDatacaptureCore", package: "scandit-capacitor-datacapture-core"),
                .product(name: "ScanditCapacitorDatacaptureBarcode", package: "scandit-capacitor-datacapture-barcode"),
                .product(name: "ScanditFrameworksLabel", package: "scandit-datacapture-frameworks-label"),
            ],
            path: "ios/Sources/ScanditCapacitorLabel"),
        .testTarget(
            name: "ScanditCapacitorLabelTests",
            dependencies: ["ScanditCapacitorLabel"],
            path: "ios/Tests/ScanditCapacitorLabelTests")
    ]
)
