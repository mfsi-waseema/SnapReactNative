//
//  CameraView.swift
//  ZMCSample
//
//  Created by Arbab Ahmad on 16/01/25.
//

import ZMCKit
import Foundation
import UIKit
import React

@objc(ZMCameraView)
class ZMCameraView: UIView {
  
  private var cameraLayout: UIView?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc var apiToken: String = "" {
    didSet { updateCameraView() }
  }
  
  @objc var lensId: String = "" {
    didSet { updateCameraView() }
  }
  
  @objc var singleLens: Bool = false {
    didSet { updateCameraView() }
  }
  
  @objc var groupId: String = "" {
    didSet { updateCameraView() }
  }
  
  // MARK: - Camera Initialization
  private func updateCameraView() {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }
      
      if self.singleLens {
        if self.apiToken.isEmpty || self.lensId.isEmpty || self.groupId.isEmpty {
          print("Missing required parameters for single lens mode.")
          return
        }
      } else {
        if self.apiToken.isEmpty || self.groupId.isEmpty {
          print("Missing required parameters for multi-lens mode.")
          return
        }
      }
      
      // Initialize ZMCKit once
      ZMCKit.initialize { initialized in
        if initialized {
          print("ZMCKit successfully initialized.")
        } else {
          print("ZMCKit failed to initialize.")
        }
      }
      
      ZMCKit.onLensChange { lensId in
        if let lensId = lensId {
          print("Current lens ID: \(lensId)")
        }
      }
      
      self.setupCameraLayout()
    }
  }
  
  private func setupCameraLayout() {
    // Cleanup previous layout if it exists
    cameraLayout?.removeFromSuperview()
    cameraLayout = nil
    
    // Choose camera layout based on singleLens flag
    cameraLayout = singleLens ? createSingleLensCameraLayout() : createGroupLensCameraLayout()
    
    // Add the layout to the view
    if let cameraLayout = cameraLayout {
      addSubview(cameraLayout)
      cameraLayout.translatesAutoresizingMaskIntoConstraints = false
      NSLayoutConstraint.activate([
        cameraLayout.topAnchor.constraint(equalTo: self.topAnchor),
        cameraLayout.bottomAnchor.constraint(equalTo: self.bottomAnchor),
        cameraLayout.leadingAnchor.constraint(equalTo: self.leadingAnchor),
        cameraLayout.trailingAnchor.constraint(equalTo: self.trailingAnchor)
      ])
    }
  }
  
  private func createSingleLensCameraLayout() -> UIView {
    let singleLensView = ZMCKit.createSingleProductView(
      snapAPIToken: self.apiToken,
      partnerGroupId: self.groupId,
      lensId: self.lensId
    )
    singleLensView.delegate = self
    return singleLensView
  }
  
  private func createGroupLensCameraLayout() -> UIView {
    let multiLensView = ZMCKit.createMultiProductView(
      snapAPIToken: self.apiToken,
      partnerGroupId: self.groupId
    )
    multiLensView.delegate = self
    return multiLensView
  }
  
  deinit {
    cameraLayout?.removeFromSuperview()
  }
}

// MARK: - ZMCameraDelegate Implementation
extension ZMCameraView: ZMCameraDelegate {
  
  func cameraDidCapture(image: UIImage?) {
    print("Camera captured an image.")
  }
  
  func shouldShowDefaultPreview() -> Bool {
    return true
  }
  
  func willShowPreview(image: UIImage?) {
    print("Will show preview for captured image.")
  }
}
